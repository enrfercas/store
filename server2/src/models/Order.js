import { Schema, model } from "mongoose";

const productSchema = new Schema({

    user: {type: Schema.Types.ObjectId,ref: 'User'},
    suborder: [{type: Schema.Types.ObjectId,ref: 'Product'}, quantity, subtotal],
    total: Number,
    // aquí podría tener otros campos relativos a la facturación pero de momento lo dejo así.    

},{
    timestamps: true,
    versionKey: false
})
export default model('Order', orderSchema)