const User = require("../models/user");
const cryptoJs = require("crypto-js");
const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.updateUser = async (req, res, next) => {
    try {
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
    } catch (err) {
        res.status(500).json({
            message: "error",
            message: err.message,
        });
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({
            status: "deleted",
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const docs = await User.find();
        res.status(200).json({
            status: "success",
            data: {
                docs,
            },
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getMe = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    authorization;
    if (!token) {
        res.status(500).json({ message: "authorization token not provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id });
        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(500).json(err);
    }
};
