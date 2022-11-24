const Cart = require("../models/cart");

exports.addToCart = async (req, res) => {
    try {
        const { cartId } = req.params;
        let cart = await Cart.findById(cartId);
        const product = req.body;

        const exist = cart.products.find((item) => {
            return item.product._id == product.product;
        });
        if (exist) {
            exist.quantity += product.quantity;
        } else {
            cart.products.push(product);
        }

        const doc = await Cart.findByIdAndUpdate(cartId, cart, {
            runValidators: true,
            new: true,
        });

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
exports.removeFromCart = async (req, res) => {
    try {
        const { cartId } = req.params;
        let cart = await Cart.findById(cartId);
        const product = req.body;
        const exist = cart.products.find((item) => {
            return item.product._id == product.product;
        });
        if (exist.quantity > 1) {
            exist.quantity -= product.quantity;
        } else {
            const index = cart.products.indexOf(exist);
            cart.products.splice(index, 1);
        }

        const doc = await Cart.findByIdAndUpdate(cartId, cart, {
            runValidators: true,
            new: true,
        });

        res.status(200).json({
            status: "success",
            data: {
                product,
                doc,
            },
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const doc = await Cart.findOne({
            userId: { $in: [userId] },
        });
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

exports.createCart = async (req, res) => {
    req.body;
    try {
        const doc = await Cart.create(req.body);
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
