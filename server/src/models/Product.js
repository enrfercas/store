const {Schema, model} = require('mongoose');

const productschema = new Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    category: {type: String},
    img : {type: String}
    }, {timestamps: true,
        versionKey: false});
        
model.exports = model('Product', productschema);

