import Order from "../models/Orders";
import User from "../models/User";
import * as jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

export const getOrders = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (token) {
            const decodedToken = jwt.verify(token, config.SECRET);
            req.params.userId = decodedToken?.id;
            const user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            const roles = await Role.find({ _id: { $in: user.roles } });
            let orders;
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'admin' || roles[i].name === 'moderator') {
                    orders = await Order.find();
                    break;
                }
                if (roles[i].name === 'user') {
                    orders = await Order.find({ user: req.params.userId });
                    break;
                }
            }
            return res.status(200).json(orders);
        } else {
            return res.status(401).json({ message: 'Token no facilitado' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Algo ha fallado' });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { body } = req;
        const newOrder = new Order(body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateOrderById = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
            new: true
        });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteOrderById = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
