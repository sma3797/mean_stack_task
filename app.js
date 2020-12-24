const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const readXlsxFile = require("read-excel-file/node");
require("dotenv").config();

const Product = require("./models/product");

const HttpError = require("./models/http-error").HttpError;

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join("public")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.use("/product", productRoutes);

app.use((req, res, next) => {
    const error = new HttpError("Route not found", 404);
    throw error;
});

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose.set("useCreateIndex", true);
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.3qujd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        mongooseOptions,
    )
    .then((result) => {
        app.listen(process.env.PORT || 5000);
        console.log(`Listening on ${process.env.PORT || 5000}`);
        console.log(`Yo`);

        // ////////////////////////////////////////////////
        // Adding Products
        // ////////////////////////////////////////////////

        // readXlsxFile("./data.xlsx").then((rows) => {
        //     rows.map(async (i) => {
        //         let productToCreate = new Product({
        //             name: i[1],
        //             image: i[2],
        //             link: i[3],
        //             price: i[4],
        //             currency: i[5],
        //             description: i[6],
        //         });
        //         console.log(productToCreate);
        //         try {
        //             const newProduct = await productToCreate.save();
        //         } catch (error) {
        //             console.log("error", error);
        //         }
        //     });
        // });

        // ////////////////////////////////////////////////
    })
    .catch((err) => {
        console.log("Error", err);
    });
