const User = require("../models/user");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Cart = require("../models/cart");
const WishList = require("../models/wishList");
const sendEmail = require("../utils/email");

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  req.body;
  const exist = await User.findOne({
    email: { $regex: new RegExp(email, "i") },
  });
  if (exist) {
    return next(new AppError("User with this email already exists", 400));
  }

  req.body.name = req.body.name.replace(/ /g, "%20%");

  await sendEmail({
    email: req.body.email,
    name: req.body.name,
    subject: "User verification link",
    url: `http://localhost:8000/api/v1/auth/register?name=${req.body.name}&email=${req.body.email}&password=${req.body.password}`,
    message: `http://localhost:8000/api/v1/auth/register?name=${req.body.name}&email=${req.body.email}&password=${req.body.password}`,
  });
  res.status(200).json({
    status: "success",
  });
});

exports.createUser = catchAsync(async (req, res) => {
  let { name, email, password } = req.query;
  name = name.replace("%20%", " ");
  const exist = await User.findOne({
    email: { $regex: new RegExp(email, "i") },
  });
  if (exist) {
    return next(new AppError("Session Expired", 400));
  }
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm: password,
  });
  await Cart.create({ userId: newUser._id, products: [] });
  await WishList.create({ userId: newUser._id, products: [] });
  res.redirect("https://yasa.vercel.app/signIn");
  res.end();
});

exports.logIn = catchAsync(async (req, res, next) => {
  if (!req.body.oAuth) {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return next(new AppError("user not found", 404));
    }

    console.log(user.comparePasswords(user.password, req.body.password));

    if (!(await user.comparePasswords(user.password, req.body.password))) {
      console.log("error");
      return next(new AppError("incorrect password", 401));
    } else {
      const { token, refreshToken } = await user.createTokens(user);
      //* passing refresh token as cookie
      //* signin in postman and you will get cookies below "Send" button
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
      });
      res.status(200).json({
        message: "success",
        token: token,
      });
    }
  } else if (req.body.oAuth) {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      user = await User.collection.insertOne(req.body);
      await Cart.create({ userId: user.insertedId, products: [] });
      await WishList.create({ userId: user.insertedId, products: [] });
      user = await User.findOne({
        _id: user.insertedId,
      });
    }

    const { token, refreshToken } = await user.createTokens(user);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
    });
    res.status(200).json({
      message: "success",
      token: token,
    });
  }
});

exports.logOut = catchAsync(async (req, res) => {
  const cookies = await req.cookies;
  if (!cookies.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", { httpOnly: true });
  res.status(200).json({
    status: "success",
    message: "cookie cleared",
  });
});

//* when access token expires
exports.refresh = catchAsync(async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return next(new AppError("unauthorised", 401));
  const refreshToken = cookies.jwt;
  //* verify token
  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
  const foundUser = await User.findOne({ _id: decoded.id });
  if (!foundUser) return next(new AppError("unauthorised", 401));
  //* new access token
  const { token } = await foundUser.createTokens(foundUser);
  res.status(200).json({
    message: "success",
    token: token,
  });
});

//? 4 - very important
exports.verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const authToken = authorization.split(" ")[1];
    jwt.verify(authToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(new AppError("incorrect jwt", 401));
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return next(new AppError("jwt not provided", 401));
  }
};
exports.verifyAdmin = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const authToken = authorization.split(" ")[1];
    jwt.verify(authToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(new AppError("incorrect jwt", 401));
      } else {
        if (user.isAdmin) {
          next();
        } else {
          return next(new AppError("only admin can perform this action", 401));
        }
      }
    });
  } else {
    return next(new AppError("jwt not provided", 401));
  }
};

exports.verifyUser = (req, res, next) => {
  this.verifyToken(req, res, () => {
    const { id } = req.params;
    if (req.user.id === id || req.user.isAdmin) {
      next();
    } else {
      return next(
        new AppError(
          "only the account owner or admin can perform this action",
          401
        )
      );
    }
  });
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email: { $in: [email] } });
  if (!user) {
    return next(new AppError("User don't exist", 404));
  }
  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${req.protocol}://localhost:3000/resetPassword/${resetToken}`;
  const message = `Visit this link ${resetUrl} to reset your password. If you havn't forget your password then ignore this mail.`;
  await sendEmail({
    email: user.email,
    subject: "password reset link (valid for 10 min)",
    message: message,
  });
  res.status(200).json({
    message: "success",
    message: "password reset link sent successfully",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { resetToken } = req.params;
  console.log(resetToken, req.body);
  const user = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetExpiry: { $gt: new Date(Date.now()) },
  });
  if (!user) {
    return next(new AppError("token is incorrect or was expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpiry = undefined;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "password reset successfully",
  });
});
