const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        //? file upload (f)
        img: [{ type: String }],
        category: {
            type: String,
            required: true,
        },
        collectionName: {
            type: String,
            required: true,
        },
        size: [{ type: String }],
        coverImg: { type: String },
        featured: Boolean,
        color: Array,
        price: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
        },
        offer: {
            type: String,
        },
        inStock: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

productSchema.pre(/^find/, function (next) {
    this.populate("user").populate({
        path: "user",
    });
    next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
