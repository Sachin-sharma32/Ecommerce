const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Collection = require("./models/collection");
const Category = require("./models/category");
const Product = require("./models/product");
const Cart = require("./models/cart");
const Rating = require("./models/rating");
const WishList = require("./models/wishlist");

const fs = require("fs");

const productData = JSON.parse(fs.readFileSync("./dev-data/product.json"));
const categoryData = JSON.parse(fs.readFileSync("./dev-data/categories.json"));
const collectionData = JSON.parse(
  fs.readFileSync("./dev-data/collections.json")
);

mongoose.connect(process.env.DB).then(() => {
  console.log("connected to db");
});

const deleteAllData = async (req, res) => {
  try {
    await Collection.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Cart.deleteMany();
    await Rating.deleteMany();
    await WishList.deleteMany();
    console.log("db is now empty");
  } catch (err) {
    console.log(err);
  }
};

const importData = async (req, res) => {
  try {
    await Product.insertMany(productData);
    await Category.insertMany(categoryData);
    await Collection.insertMany(collectionData);
    console.log("data imported");
  } catch (err) {
    console.log(err);
  }
};

//- 48
if (process.argv[2] == "--delete") {
  deleteAllData();
} else if (process.argv[2] == "--import") {
  importData();
}
