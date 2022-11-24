const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const sanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cartRouter = require("./routes/cart");

const stripe = require("stripe")(
    "sk_test_51LdwmjSDTojZ29pJy3CjBf76FitpzXXlIpvb3BCeXR9tIjRd1pIsk2pJHXPEiNxCnhrOm6UjUQtkAeoTxSFR4ZKb003xyfWtu6"
);

const app = express();

//? 2
//* parse (read) incomming cookie
app.use(cookieParser());

app.use(compression());

const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Can only make 100 requests to server in 1 hour",
});

app.use("/api", limiter);
app.use(helmet.crossOriginOpenerPolicy());
app.use(sanitize());
app.use(hpp());
app.use(morgan("dev"));

const uploadRouter = require("./routes/upload");
const path = require("path");

app.use(express.json({ limit: "1mb" }));

//? 7
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
// app.options("*", cors());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/carts", cartRouter);

//? (f)
app.use("/api/v1/uploads", uploadRouter);
app.use(express.static("uploads"));

//? payment (p)
app.post("/api/payment", async (req, res) => {
    const orderItems = req.body;
    try {
        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                { shipping_rate: "shr_1M2AZRSDTojZ29pJQZHLwMq4" },
                { shipping_rate: "shr_1M2AakSDTojZ29pJczmvqtj9" },
            ],
            line_items: orderItems.products.map((item) => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.product.title,
                        },
                        unit_amount: item.product.price * 100,
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000/`,
        };
        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json({ url: session.url });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
});

app.all("*", (req, res) => {
    res.status(404).json({
        status: "failure",
        message: `cannot find ${req.originalUrl} on the server `,
    });
});

mongoose
    .connect(
        "mongodb+srv://sachin:sachin1234@cluster0.rum0d3d.mongodb.net/?retryWrites=true&w=majority"
    )
    .then((connection) => {
        console.log("connected to db");
    });

app.listen(process.env.PORT, () => {
    console.log("server is up and running");
});
