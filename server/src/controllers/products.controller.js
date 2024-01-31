const productCtrl = {};

const Product = require('../models/Product');

productCtrl.getProducts = async (req, res) => {
    const products = await Product.find();  
    res.send('Los Productos')};

productCtrl.createProduct = (req, res) => {res.send('Creando un producto')};

productCtrl.getSingleProduct = (req, res) => {res.send('Listando un solo producto')};

productCtrl.editProduct = (req, res) => {res.send('Actualizando un Producto')};

productCtrl.deleteProduct = (req, res) => {res.send('Borrando un Producto')};




module.exports = productCtrl;
