const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    desc: {
      type: String,
      required: true,
    },
    img: [{ type: String }],
    featured: Boolean,
  },
  { timestamps: true }
);

categorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "parentCategory",
  });
  next();
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
