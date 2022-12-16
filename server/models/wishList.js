const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            color: { type: String },
            size: { type: String },
        },
    ],
});

wishListSchema.pre(/^find/, function (next) {
    this.populate({
        path: "products.product",
    });
    next();
});

const WishList = mongoose.model("WishList", wishListSchema);
module.exports = WishList;
