import express from 'express'
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus} from '../../controllers/Order_Management/OrderController.js'
import OrderModel from "../models/OrderModel.js";
const orderRouter = express.Router();

//placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { token, amount, items, address, paymentMethod } = req.body;
        const order = new OrderModel({
            userId: req.user._id,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        })
        await order.save();
        res.send('Order Placed Successfully');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const { token, amount, items, address, paymentMethod } = req.body;
        const order = new OrderModel({
            userId: req.user._id,
            items,
            amount,
            address,
            paymentMethod,
            date: Date.now()
        })
        await order.save();
        res.send('Order Placed Successfully');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    try {
        const { token, amount, items, address, paymentMethod } = req.body;
        const order = new OrderModel({
            userId: req.user._id,
            items,
            amount,
            address,
            paymentMethod,
            date: Date.now()
        })
        await order.save();
        res.send('Order Placed Successfully');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//All Orders data for Admin panal
const allOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({});
        res.send(orders);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//user Order Data for Frontend
const userOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({ userId: req.user._id });
        res.send(orders);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//update Order Status from Admin panal
const updateStatus = async (req, res) => {
    try {
        const { orderId, type } = req.body;
        let order = await Order
        Model.findById(orderId);
        order.status = type;
        await order.save();
        res.send('Status Updated Successfully');
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    
    export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }


// Admin Features
orderRouter.post('/list', allOrders,adminAuth)
orderRouter.post('/Status', updateStatus,adminAuth)

// Payment Features
orderRouter.post('/placeOrder', placeOrder,authUser)
orderRouter.post('/placeOrderStripe', placeOrderStripe,authUser)
orderRouter.post('/placeOrderRazorpay', placeOrderRazorpay,authUser)

// User Features
orderRouter.post('/userOrders', userOrders,authUser)

export default orderRouter;
