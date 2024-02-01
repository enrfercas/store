const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/productosdb2', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4
}).then(db => console.log('DB is conected')).catch(err => console.error(err));

//module.exports = mongoose;

