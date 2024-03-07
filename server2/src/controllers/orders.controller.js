import Order from "../models/Product";
//import Product from "../models/Product";
//import User from "../models/User";


export const getOrders = async (req, res) => {
    const orders = await Order.find();
    res.status(200).json(orders);
}
export const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    res.status(200).json(order);
}

export const getOrdersByUser = async (req, res) => {
    const orders = await Order.find({user: req.params.userId});
    res.status(200).json(orders);
}

export const createOrder = async (req, res) => {
    const {body} = req;
    const newOrder = new Order(body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
}
export const updateOrderById = async (req, res) => {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
        new: true
    })
    res.status(200).json(updatedOrder);
    console.log(req.body);
}

export const deleteOrderById = async(req, res) => {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    res.status(204).json();

}
