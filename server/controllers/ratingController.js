const Rating = require("../models/rating");
const catchAsync = require("../utils/catchAsync");

exports.deleteRating = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await Rating.findByIdAndDelete(id);
    res.status(200).json({
        status: "deleted",
    });
});

exports.getAllRatings = catchAsync(async (req, res, next) => {
    const docs = await Rating.find();
    res.status(200).json({
        status: "success",
        data: {
            docs,
        },
    });
});

exports.getRating = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Rating.findById(id);
    res.status(200).json({
        status: "success",
        data: {
            doc,
        },
    });
});

exports.createRating = catchAsync(async (req, res, next) => {
    req.body;
    const doc = await Rating.create(req.body);
    res.status(200).json({
        status: "success",
        data: {
            doc,
        },
    });
});
