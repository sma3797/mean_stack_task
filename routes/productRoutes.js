const router = require("express").Router();
const productControllers = require("../controllers/productControllers");

router.post("/all-products", productControllers.allProducts);
router.post("/single-product", productControllers.singleProduct);

module.exports = router;
