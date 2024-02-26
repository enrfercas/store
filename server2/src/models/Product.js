import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: String,
    category: String,
    price: Number,
    img: String,
    description: String,
    id:Number
},{
    timestamps: true,
    versionKey: false
})
export default model('Product', productSchema)





