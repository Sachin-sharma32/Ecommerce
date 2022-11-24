const Product = require("../models/product");

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedDoc = await Product.findByIdAndUpdate(id, req.body, {
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

exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({
            status: "deleted",
            data: {
                product,
            },
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllProducts = async (req, res, next) => {
    ("request");
    try {
        const docs = await Product.find();
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

exports.getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const doc = await Product.findById(id);
        res.status(200).json({
            status: "success",
            data: {
                doc,
            },
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const doc = await Product.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                doc,
            },
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
};
