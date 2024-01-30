const productCtrl = {};

productCtrl.getProducts = (req, res) => {res.send('Los Productos')};

productCtrl.createProduct = (req, res) => {res.send('Creando un producto')};

productCtrl.getSingleProduct = (req, res) => {res.send('Listando un solo producto')};

productCtrl.editProduct = (req, res) => {res.send('Actualizando un Producto')};

productCtrl.deleteProduct = (req, res) => {res.send('Borrando un Producto')};




module.exports = productCtrl;
