const Product = require("../models/product");
const catchAsync = require("../utils/catchAsync");

exports.updateProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updatedDoc = await Product.findByIdAndUpdate(id, req.body, {
        // runValidators: true,
        new: true,
    });
    res.status(200).json({
        status: "success",
        data: updatedDoc,
    });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({
        status: "deleted",
        data: {
            product,
        },
    });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
    const docs = await Product.find();
    res.status(200).json({
        status: "success",
        data: {
            docs,
        },
    });
});

exports.getProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Product.findById(id);
    res.status(200).json({
        status: "success",
        data: {
            doc,
        },
    });
});

exports.createProduct = catchAsync(async (req, res, next) => {
    req.body;
    const doc = await Product.create(req.body);
    res.status(200).json({
        status: "success",
        data: {
            doc,
        },
    });
});
