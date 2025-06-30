const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const mockUserId =  new mongoose.Types.ObjectId("66b1ad4a9d0fa730e14b965a");

router.post('/',async(req,res)=>{
    try {
        const cart = await Cart.findOne({userId: mockUserId}).populate('items.productId');
        if(!cart || cart.items.length===0){
        return res.status(400).json({message: 'Cart is Empty'});
       }
       const totalAmount = cart.items.reduce((sum , item)=> {
        return sum + item.quantity *(item.productId?.price || 0);},0);
       const order = new Order ({
       userId: mockUserId,
       products: cart.items.map(item => ({
        productId: item.productId._id,
        quantity:  item.quantity
       })),
       totalAmount
      });
      await order.save();
      await Cart.findOneAndDelete({userId: mockUserId});
      res.status(201).json(order);
    }catch (err){
        res.status(500).json({message: 'Error placing order'})
    }
});

router.get('/',async(req,res)=>{
    try {
        const orders = await Order.find({userId: mockUserId}).populate('products.productId');
        res.json(orders);
    }catch(err){
        console.error("❌ Error placing order:", err.message);
        res.status(500).json({message: 'Error fetching orders',error: err.message});
    }
});
module.exports = router;