const Product = require("../models/Product");


const productCtrl = {};

productCtrl.getProducts = async (req, res) => {
    const products = await Product.find();  
    res.json(products)
    //console.log(res)
    //res.send('Listando todos los productos') //esto es lo mismo que arriba pero en una sola linea
    };

productCtrl.createProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    console.log(newProduct);
    await newProduct.save();
    res.send({ message: 'Product Created'});
}


productCtrl.getSingleProduct = async (req, res) => {
    //const product = await Product.findById(req.params._id)
    // Otra forma sería:  await Employee.findOne({_id: req.params.id})
    const product = await Product.findOne({_id: req.params._id})
    console.log(product);
    res.send(product);
}

productCtrl.editProduct = async (req, res) => {
    await Product.findByIdAndUpdate(req.params._id, req.body)
    res.json({status: 'Product Updated'})
}
productCtrl.deleteProduct = async (req, res) => {
    console.log(req.params.id);
    console.log(req.params);
    await Product.findByIdAndDelete(req.params._id)
    res.json({status: 'Employee Deleted'})
}



module.exports = productCtrl
