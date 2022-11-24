const mongoose = require("mongoose");
const Product = require("./product");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
            },
        ],
        amount: {
            type: Number,
            required: true,
        },
        address: {
            type: Object,
            required: true,
        },
        status: {
            type: String,
            default: "pending",
        },
    },
    { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
    this.populate({ path: "products.product" });
    next();
});

orderSchema.pre(/^find/, function (next) {
    this.populate({ path: "user" });
    next()
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
