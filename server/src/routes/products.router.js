
const {Router} = require('express');

const router = Router();    

const productsCtrl = require('../controllers/products.controller');

router.get("/products", productsCtrl.getProducts);

router.post("/products", productsCtrl.createProduct);

router.get("/products/:_id", productsCtrl.getSingleProduct);

router.put("/products/:_id", productsCtrl.editProduct);

router.delete("/products/:_id", productsCtrl.deleteProduct);

module.exports = router;
