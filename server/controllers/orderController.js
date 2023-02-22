const Order = require("../models/order.js");
const catchAsync = require("../utils/catchAsync.js");

exports.updateOrder = catchAsync(async (req, res, next) => {
    req.body;
    const { id } = req.params;
    const updatedDoc = await Order.findByIdAndUpdate(id, req.body, {
        // runValidators: true,
        new: true,
    });
    const docs = await Order.find();
    res.status(200).json({
        status: "success",
        data: {
            updatedDoc,
            docs,
        },
    });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({
        status: "deleted",
    });
});

exports.getAllOrders = catchAsync(async (req, res) => {
    const docs = await Order.find();
    res.status(200).json({
        status: "success",
        data: {
            docs,
        },
    });
});

exports.getOrder = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const docs = await Order.find({
        user: { $in: [userId] },
    });
    res.status(200).json({
        status: "success",
        data: {
            docs,
        },
    });
});

exports.createOrder = catchAsync(async (req, res, next) => {
    const doc = await Order.create(req.body);
    res.status(200).json({
        status: "success",
        data: {
            doc,
        },
    });
});
