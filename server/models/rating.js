const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
        },
        rating: { type: Number, required: true },
        message: { type: String },
        img: [{ type: String }],
    },
    { timestamps: true }
);

ratingSchema.pre(/^find/, function (next) {
    this.populate({ path: "userId" });
    next();
});

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;
