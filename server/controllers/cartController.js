const Cart = require("../models/cart");
const catchAsync = require("../utils/catchAsync");

exports.addToCart = catchAsync(async (req, res) => {
    const { cartId } = req.params;
    let cart = await Cart.findById(cartId);
    const product = req.body;

    const exist = cart.products.find((item) => {
        if (product.quantity) {
            return (
                item.product?._id == product.product &&
                item.color == product.color &&
                item.size == product.size
            );
        } else {
            return item._id == product.itemId;
        }
    });
    if (exist) {
        if (product.quantity) {
            exist.quantity += product.quantity;
        }
        if (product.color) {
            exist.color = req.body.color;
        }
        if (product.size) {
            exist.size = req.body.size;
        }
        // const newCart = { ...cart };
        // const index = newCart.products.indexOf(exist);
        // newCart.products.splice(index, 1);
        // const existDuplicate = newCart.products.find((item) => {
        //     return (
        //         item.product._id == exist.product._id &&
        //         item.color == exist.color &&
        //         item.size == exist.size
        //     );
        // });
        // ("exist");
        // const quantity = exist.quantity;
        // cart.splice(index, 1);
        // existDuplicate.quantity += quantity;
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
});

exports.removeFromCart = catchAsync(async (req, res) => {
    const { cartId } = req.params;
    let cart = await Cart.findById(cartId);
    const product = req.body;
    const exist = cart.products.find((item) => {
        return item.product._id == product.product;
    });
    if (exist.quantity > 1) {
        exist.quantity -= product.quantity;
        if (exist.quantity <= 0) {
            const index = cart.products.indexOf(exist);
            cart.products.splice(index, 1);
        }
    } else {
        const index = cart.products.indexOf(exist);
        cart.products.splice(index, 1);
    }

    const doc = await Cart.findByIdAndUpdate(cartId, cart, {
        runValidators: true,
        new: true,
    });

    ("removed");

    res.status(200).json({
        status: "success",
        data: {
            product,
            doc,
        },
    });
});

exports.getCart = catchAsync(async (req, res) => {
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
});

exports.createCart = catchAsync(async (req, res) => {
    const doc = await Cart.create(req.body);
    res.status(200).json({
        status: "success",
        data: {
            doc,
        },
    });
});
