
const {Router} = require('express');

const router = Router();    

const productsCtrl = require('../controllers/products.controller');

router.get("/products", productsCtrl.getProducts);

router.post("/products", productsCtrl.createProduct);

router.get('/products:id', productsCtrl.getSingleProduct);

router.put('/products:id', productsCtrl.editProduct);

router.delete('/products:id', productsCtrl.deleteProduct);

module.exports = router;
