const WishList = require("../models/wishList");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.addToWishList = catchAsync(async (req, res, next) => {
    const { wishListId } = req.params;
    let wishList = await WishList.findById(wishListId);
    const product = req.body;

    const exist = wishList.products.find((item) => {
        return (
            item.product._id == product.product &&
            item.color == product.color &&
            item.size == product.size
        );
    });
    if (exist) {
        return next(
            new AppError(
                "Product with the same configration exists in you wishlist",
                403
            )
        );
    } else {
        wishList.products.push(product);
    }

    const doc = await WishList.findByIdAndUpdate(wishListId, wishList, {
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

exports.removeFromWishList = catchAsync(async (req, res) => {
    const { wishListId } = req.params;
    let wishList = await WishList.findById(wishListId);
    const product = req.body;

    const index = wishList.products.indexOf(product);
    wishList.products.splice(index, 1);

    const doc = await WishList.findByIdAndUpdate(wishListId, wishList, {
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
});

exports.getWishList = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const doc = await WishList.findOne({
        userId: { $in: [userId] },
    });
    res.status(200).json({
        status: "success",
        data: {
            doc,
        },
    });
});

exports.createWishList = catchAsync(async (req, res) => {
    const doc = await WishList.create(req.body);
    res.status(200).json({
        status: "success",
        data: {
            doc,
        },
    });
});
