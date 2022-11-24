const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLenght: [3, "name should be more than 2 characters long"],
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        passwordConfirm: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        img: String,
        address: Object,
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
