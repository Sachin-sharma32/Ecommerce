const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cryptoJs = require("crypto-js");
const validator = require("validator");
const dotenv = require("dotenv");
dotenv.config({ path: "../../config.env" });

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlenght: [3, "name should be more than 2 characters long"],
            maxlength: [20, "name should be less than 20 characters"],
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, "please provide valid email"],
        },
        password: {
            type: String,
            minlength: [6, "password should be atleast 6 characters long"],
        },
        passwordConfirm: {
            type: String,
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: "please fill same passwords in the fields",
            },
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        img: String,
        address: Object,
        passwordResetToken: String,
        passwordResetExpiry: Date,
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    (this.password = cryptoJs.AES.encrypt(
        this.password,
        "sachin1234"
    ).toString()),
        next();
});

userSchema.methods.comparePasswords = async (userPassword, requestPassword) => {
    const hastPassword = cryptoJs.AES.decrypt(userPassword, "sachin1234");

    const password = hastPassword.toString(cryptoJs.enc.Utf8);
    return password === requestPassword;
};

userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = cryptoJs.AES.encrypt(
        process.env.passwordSecret,
        "sachin1234"
    ).toString();
    this.passwordResetToken = resetToken;
    this.passwordResetExpiry = Date.now() + 10 * 1000 * 60;
    this.passwordResetExpiry, this.passwordResetToken, new Date(Date.now());
    return resetToken;
};

userSchema.methods.createTokens = async (user) => {
    //* access token
    const token = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        "sachin1234",
        {
            expiresIn: "30m",
        }
    );
    //* refresh token
    const refreshToken = jwt.sign({ id: user._id }, "sachin1234", {
        expiresIn: "100d",
    });
    return { token, refreshToken };
};

const User = mongoose.model("User", userSchema);
module.exports = User;
