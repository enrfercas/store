const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    category: {type: String},
    img : {type: String}
    }, {timestamps: true,
        versionKey: false});
        
module.exports = model('Product', productSchema);

