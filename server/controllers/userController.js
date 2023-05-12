const User = require("../models/user");
const cryptoJs = require("crypto-js");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (req.body.password) {
    req.body.password = cryptoJs.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_SECRET
    ).toString();
  }

  const updatedDoc = await User.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: updatedDoc,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(200).json({
    status: "deleted",
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const docs = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      docs,
    },
  });
});

exports.getMe = catchAsync(async (req, res) => {
  console.log(process.env.JWT_SECRET);
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  if (!token) {
    res.status(500).json({ message: "authorization token not provided" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: decoded.id });
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
