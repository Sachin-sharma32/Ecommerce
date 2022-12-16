const Collection = require("../models/collection.js");
const catchAsync = require("../utils/catchAsync.js");

exports.updateCollection = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updatedDoc = await Collection.findByIdAndUpdate(id, req.body, {
        // runValidators: true,
        new: true,
    });
    res.status(200).json({
        status: "success",
        data: updatedDoc,
    });
});

exports.deleteCollection = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await Collection.findByIdAndDelete(id);
    res.status(200).json({
        status: "deleted",
    });
});

exports.getAllCollections = catchAsync(async (req, res) => {
    const docs = await Collection.find();
    res.status(200).json({
        status: "success",
        data: {
            docs,
        },
    });
});

// exports.getCollection = catchAsync(async (req, res) => {
//     const { userId } = req.params;
//     const docs = await Collection.find({
//         user: { $in: [userId] },
//     });
//     res.status(200).json({
//         status: "success",
//         data: {
//             docs,
//         },
//     });
// });

exports.createCollection = catchAsync(async (req, res, next) => {
    const doc = await Collection.create(req.body);
    res.status(200).json({
        status: "success",
        data: {
            doc,
        },
    });
});
