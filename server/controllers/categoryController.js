const Category = require("../models/category.js");
const catchAsync = require("../utils/catchAsync.js");

exports.updateCategory = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updatedDoc = await Category.findByIdAndUpdate(id, req.body, {
        // runValidators: true,
        new: true,
    });
    res.status(200).json({
        status: "success",
        data: updatedDoc,
    });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({
        status: "deleted",
    });
});

exports.getAllCategories = catchAsync(async (req, res) => {
    ("hello");
    const docs = await Category.find();
    res.status(200).json({
        status: "success",
        data: {
            docs,
        },
    });
});

exports.createCategory = catchAsync(async (req, res, next) => {
    const doc = await Category.create(req.body);
    res.status(200).json({
        status: "success",
        data: {
            doc,
        },
    });
});
