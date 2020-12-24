const fs = require("fs");

const Product = require("../models/product");
const HttpError = require("../models/http-error").HttpError;

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

exports.allProducts = async (req, res, next) => {
    const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;
    const { query } = req.body;
    const regex = new RegExp(escapeRegex(query ? query : ""), "gi");
    let products;
    try {
        products = await Product.find(
            { name: regex },
            { name: 1, image: 1, price: 1, currency: 1 },
            {
                skip,
                limit: parseInt(process.env.LIMIT_PRODUCTS),
            },
        ).sort({ createdAt: -1 });
    } catch (error) {
        console.log("error", error);
        return next(new HttpError("Something went wrong", 500));
    }
    res.status(200).json({ message: "Ok", products });
};

exports.singleProduct = async (req, res, next) => {
    const { productId } = req.body;
    let product;
    try {
        product = await Product.findOne({ _id: productId });
    } catch (error) {
        return next(new HttpError("Something went wrong", 500));
    }
    res.status(200).json({ message: "Ok", product });
};
