const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
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
                color: String,
                quantity: Number,
                size: String,
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
            default: "order placed",
            enum: {
                values: [
                    "order placed",
                    "out for delivery",
                    "delivered",
                    "cancled",
                ],
                message:
                    "status values: pending, order placed, out for delivery, delivered or cancled",
            },
        },
    },
    { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
    this.populate({ path: "products.product" });
    next();
});

orderSchema.pre(/^find/, function (next) {
    this.populate({ path: "userId" });
    next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
