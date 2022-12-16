const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        featured: Boolean,
        img: [{ type: String }],
    },
    { timestamps: true }
);

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
