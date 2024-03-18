
import Order from "../models/Orders";
//import Product from "../models/Product";
import User from "../models/User";
import * as jwt from 'jsonwebtoken'
import Role from '../models/Role.js'


export const getOrders = async (req, res) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            const decodedToken = jwt.verify(token, config.SECRET);
            req.userId = decodedToken?.id;
            const user = await User.findById(req.userId);
            const roles = await Role.find({ _id: { $in: user.roles } });
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'admin' || roles[i].name === 'moderator') {
                    const orders = await Order.find();
                    return res.status(200).json(orders);
                }
                if (roles[i].name === 'user') {
                    const orders = await Order.find({ user: req.params.userId });
                    return res.status(200).json(orders);
                }
            }
        } else {
            return res.status(401).json({ message: 'Token no facilitado' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Algo ha fallado' });
    }
}
export const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    res.status(200).json(order);
}

export const getOrdersByUser = async (req, res) => {
    const token = req.headers.authorization;
    const user = await User.findOne({ token });
    const orders = await Order.find({ user: req.params.userId });
    res.status(200).json(orders);
}

export const createOrder = async (req, res) => {
    const { body } = req;
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

export const deleteOrderById = async (req, res) => {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    res.status(204).json();

}


