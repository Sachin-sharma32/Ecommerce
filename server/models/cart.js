const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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
            quantity: Number,
        },
    ],
});

cartSchema.pre(/^find/, function (next) {
    this.populate({
        path: "products.product",
    });
    next();
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
