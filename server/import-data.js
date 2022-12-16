const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Collection = require("./models/collection");
const Category = require("./models/category");
const Product = require("./models/product");
const fs = require("fs");

const productData = JSON.parse(fs.readFileSync("./dev-data/product.json"));
const categoryData = JSON.parse(fs.readFileSync("./dev-data/categories.json"));
const collectionData = JSON.parse(
    fs.readFileSync("./dev-data/collections.json")
);

mongoose
    .connect(
        "mongodb+srv://sachin:sachin1234@cluster0.rum0d3d.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("connected to db");
    });

const deleteAllData = async (req, res) => {
    try {
        await Collection.deleteMany();
        // await Category.deleteMany();
        // await Product.deleteMany();
        console.log("db is now empty");
    } catch (err) {
        console.log(err);
    }
};

const importData = async (req, res) => {
    try {
        // await Product.insertMany(productData);
        // await Category.insertMany(categoryData);
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
