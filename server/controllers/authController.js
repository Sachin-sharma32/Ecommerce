const User = require("../models/user");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    req.body;
    try {
        const newUser = await User.create({
            ...req.body,
            password: cryptoJs.AES.encrypt(
                req.body.password,
                process.env.CRYPTO_SECRET
            ).toString(),
        });
        res.status(200).json({
            message: "success",
            data: {
                newUser,
            },
        });
    } catch (err) {
        res.status(404).json(err);
    }
};

exports.logIn = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        const hastPassword = cryptoJs.AES.decrypt(
            user.password,
            process.env.CRYPTO_SECRET
        );

        const password = hastPassword.toString(cryptoJs.enc.Utf8);

        if (password !== req.body.password) {
            return res.status(404).json({ message: "incorrect password" });
        } else {
            //* access token
            const token = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "5m",
                }
            );
            //* refresh token
            const refreshToken = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "100d" }
            );
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
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.logOut = (req, res) => {
    "logout cookie", req.cookies;
    try {
        const cookies = req.cookies;
        if (!cookies.jwt) return res.sendStatus(204);
        res.clearCookie("jwt", { httpOnly: true });
        res.status(200).json({
            status: "success",
            message: "cookie cleared",
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

//* when access token expires
exports.refresh = async (req, res) => {
    "refresh cookie", req.cookies;
    const cookies = req.cookies;
    "cookies", cookies;
    if (!cookies.jwt)
        return res.status(401).json({
            status: "unauthorised",
        });
    const refreshToken = cookies.jwt;
    //* verify token

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const foundUser = await User.findOne({ _id: decoded.id });
        if (!foundUser)
            return res.status(401).json({ message: "Unauthorised" });
        //* new access token
        const token = jwt.sign(
            {
                id: foundUser._id,
                isAdmin: foundUser.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "10m" }
        );
        res.status(200).json({
            message: "success",
            token: token,
        });
    } catch (err) {
        if (err) return res.status(403).json({ message: "forbidden" });
    }
};

//? 4 - very important
exports.verifyToken = (req, res, next) => {
    const { authorization } = req.headers;
    authorization;
    if (authorization) {
        const authToken = authorization.split(" ")[1];
        jwt.verify(authToken, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.status(401).json({ message: "incorrect jwt" });
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        res.status(401).json({ message: "jwt not provided" });
    }
};

exports.verifyAdmin = (req, res, next) => {
    this.verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(401).json({
                message: "only admin can perform this action",
            });
        }
    });
};

exports.verifyUser = (req, res, next) => {
    this.verifyToken(req, res, () => {
        const { id } = req.params;
        if (req.user.id === id || req.user.isAdmin) {
            next();
        } else {
            next(
                res.status(401).json({
                    message:
                        "only the account owner or admin can perform this action",
                })
            );
        }
    });
};
