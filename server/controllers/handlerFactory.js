// const catchAsync = require("../utils/catchsync");

// exports.updateOne = (Model) => {
//     catchAsync(async (req, res, next) => {
//         const { id } = req.params;
//         const updatedDoc = await Model.findByIdAndUpdate(id, req.body, {
//             runValidators: true,
//             new: true,
//         });
//         res.status(200).json({
//             status: "success",
//             data: updatedDoc,
//         });
//     });
// };

// exports.deleteOne = (Model) => {
//     catchAsync(async (req, res, next) => {
//         const { id } = req.params;
//         await Model.findByIdAndDelete(id);
//         res.status(200).json({
//             status: "deleted",
//         });
//     });
// };

// exports.getAll = (Model) => {
//     catchAsync(async (req, res, next) => {
//         const docs = await Model.find();
//         res.status(200).json({
//             status: "success",
//             data: {
//                 docs,
//             },
//         });
//     });
// };

// exports.getOne = (Model) => {
//     catchAsync(async (req, res, next) => {
//         const { id } = req.params;
//         const doc = await Model.findById(id);
//         res.status(200).json({
//             status: "success",
//             data: {
//                 doc,
//             },
//         });
//     });
// };

// exports.createOne = (Model) => {
//     catchAsync(async (req, res, next) => {
//         const doc = await Model.create(req.body);
//         res.status(200).json({
//             status: "success",
//             data: {
//                 doc,
//             },
//         });
//     });
// };
