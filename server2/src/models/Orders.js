import { Schema, model } from "mongoose";



const suborderSchema = new Schema({
    _id: false, // Deshabilita la creación automática del campo _id
    idProduct: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    subtotal: Number
});

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    suborders: [suborderSchema], // Utiliza el subesquema definido para suborders
    total: Number,
}, {
    timestamps: true,
    versionKey: false
});



/* const ordersSchema = new Schema({
    orders: [orderSchema]
}, {
    timestamps: true,
    versionKey: false
}); */

export default model('Order', orderSchema);
