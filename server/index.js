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
const statRouter = require("./routes/stat");
const categoryRouter = require("./routes/category");
const collectionRouter = require("./routes/collection");
const ratingRouter = require("./routes/rating");
const wishListRouter = require("./routes/wishList");
const Cart = require("./models/cart");
const User = require("./models/user");
const Order = require("./models/order");
const bodyParser = require("body-parser");
const testimonialRouter = require("./routes/testimonial");

const stripe = require("stripe")(
    "sk_test_51LdwmjSDTojZ29pJy3CjBf76FitpzXXlIpvb3BCeXR9tIjRd1pIsk2pJHXPEiNxCnhrOm6UjUQtkAeoTxSFR4ZKb003xyfWtu6"
);

const app = express();

//? 2
//* parse (read) incoming cookie
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
const AppError = require("./utils/AppError");

//* place it before app.use(express.json())
app.post(
    "/webhook",
    bodyParser.raw({ type: "application/json" }),
    async (req, res) => {
        //------------ verify that the response is coming from stripe
        //* stripe listen --print-secret -> signature
        //* stripe listen --forward-to=localhost:8000/webhook
        //* stripe trigger customer.created -> trigger fake event
        const payload = req.body;
        const signature = req.headers["stripe-signature"];
        const endpointSecret =
            "whsec_a2c8949d7163595d2a45f2b8d662f610ff85037f67d0b82db5c3f96d42a24fb7";
        let event;
        try {
            event = stripe.webhooks.constructEvent(
                payload,
                signature,
                endpointSecret
            );
            //----------------------------------------------------------
            if (event.type === "checkout.session.completed") {
                const customer = await stripe.customers.retrieve(
                    event.data.object.customer
                );
                const cart = await Cart.findOne({
                    userId: { $in: [customer.metadata.userId] },
                });
                cart;
                const order = await Order.create({
                    userId: cart.userId,
                    products: cart.products,
                    status: "order placed",
                    amount: event.data.object.amount_total / 100,
                    address: event.data.object.customer_details.address,
                });
            }
        } catch (err) {
            err;
            return res.status(500).json({ err });
        }

        res.status(200).json({
            message: "success",
        });
    }
);

app.use(
    express.json({
        limit: "1mb",
    })
);

//? 7
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        optionsSuccessStatus: 200,
    })
);
// app.use(cors());
// app.options("*", cors());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/collections", collectionRouter);
app.use("/api/v1/ratings", ratingRouter);
app.use("/api/v1/wishLists", wishListRouter);
app.use("/api/v1/stats", statRouter);
app.use("/api/v1/testimonials", testimonialRouter);

//? (f)
app.use("/api/v1/uploads", uploadRouter);
app.use(express.static("uploads"));

//? payment (p)
app.post("/api/payment", async (req, res) => {
    const user = await User.findById(req.body.userId);
    const orderItems = req.body;
    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userId,
        },
    });
    try {
        const params = {
            submit_type: "pay",
            mode: "payment",
            // customer_email: user.email,
            payment_method_types: ["card"],
            billing_address_collection: "required",
            phone_number_collection: {
                enabled: true,
            },
            //* cannot go to stripe page if coupon expired
            // discounts: [
            //     {
            //         coupon: "deG5Cv9e",
            //     },
            // ],
            custom_text: {
                submit: {
                    message:
                        "This transaction you make is totally secure. We don't save your CVV number.",
                },
            },
            payment_method_options: {
                card: {
                    installments: {
                        enabled: true,
                    },
                },
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: { amount: 0, currency: "inr" },
                        display_name: "Free shipping",
                        delivery_estimate: {
                            minimum: { unit: "business_day", value: 5 },
                            maximum: { unit: "business_day", value: 7 },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: { amount: 100 * 100, currency: "inr" },
                        display_name: "Fast Delivery",
                        delivery_estimate: {
                            minimum: { unit: "hour", value: 10 },
                            maximum: { unit: "business_day", value: 2 },
                        },
                    },
                },
            ],
            line_items: orderItems.products.map((item) => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.product.title,
                            description: item.product.desc,
                            images: item.product.img.map((image) => image),
                        },
                        unit_amount: item.product.price * 100,
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000/checkout`,
            customer: customer.id,
        };
        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json({ url: session.url });
    } catch (err) {
        err;
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
});

app.all("*", (req, res) => {
    res.status(404).json({
        status: "failure",
        message: `cannot find ${req.originalUrl} on the server`,
    });
});

const handleCastError = (error) => {
    return new AppError(`Invalid ${error.path}: ${error.value}`, 400);
};

const handleDuplicateFieldError = (err, res) => {
    const message = `${err.keyValue.email} already exist`;
    return new AppError(message, 400);
};

const handleValidationError = (err, res) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
};

const handleJWTError = (err) => {
    const message = "Invalid jwt";
    return new AppError(message, 401);
};

const handleExpirationalError = (err) =>
    new AppError("your jwt token has expired", 404);

app.use((err, req, res, next) => {
    err;
    let { ...error } = err;
    if (err.name === "CastError") error = handleCastError(error);
    if (err.code === 11000) error = handleDuplicateFieldError(error);
    if (err.name === "ValidationError") error = handleValidationError(error);
    if (err.name === "JsonWebTokenError") error = handleJWTError(error);
    if (err.name === "TokenExpiredError")
        error = handleExpirationalError(error);
    res.status(error.statusCode).json({
        status: error.status,
        message: error.msg,
    });
    // res.status(500).json({
    //     message: err.message,
    // });
});

mongoose
    .connect(
        "mongodb+srv://sachin:sachin1234@cluster0.rum0d3d.mongodb.net/?retryWrites=true&w=majority"
    )
    .then((connection) => {
        ("connected to db");
    });

app.listen(8000, () => {
    ("server is up and running");
});
