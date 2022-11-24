const Order = require("../models/order.js");

exports.updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedDoc = await Order.findByIdAndUpdate(id, req.body, {
            // runValidators: true,
            new: true,
        });
        res.status(200).json({
            status: "success",
            data: updatedDoc,
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndDelete(id);
        res.status(200).json({
            status: "deleted",
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllOrders = async (req, res) => {
    console.log("get all orders");
    try {
        const docs = await Order.find();
        res.status(200).json({
            status: "success",
            data: {
                docs,
            },
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getOrder = async (req, res) => {
    try {
        const { userId } = req.params;
        const doc = await Order.findOne({
            user: { $in : [userId]}
        });
        res.status(200).json({
            status: "success",
            data: {
                doc,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

exports.createOrder = async (req, res, next) => {
    try {
        const doc = await Order.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                doc,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
