const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        img: [{ type: String }],
        featured: Boolean,
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
