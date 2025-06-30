const express =  require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product')
const mockUserId = new mongoose.Types.ObjectId("66b1ad4a9d0fa730e14b965a");

router.get('/',async(req,res)=>{
    try {
        const cart =  await Cart.findOne({userId: mockUserId}).populate('items.productId');
        res.json(cart || {items: []});
    } catch(err){
        res.status(500).json({message : 'Error Fetching Cart'});
    }
});

router.post('/add',async(req,res)=>{
    let{quantity,productId} = req.body;
    quantity = parseInt(quantity);
    console.log ('🛒 Incoming Add to Cart:', { quantity, productId,type: typeof quantity });
    try{
        let cart = await Cart.findOne({userId: mockUserId});
        if(!cart){
            cart = new Cart({userId: mockUserId ,items: []});
        }
        const index = cart.items.findIndex(item => item.productId.equals(productId));
        if(index > -1){
            cart.items[index].quantity +=quantity;
        }
        else{
            cart.items.push({productId,quantity});
      }
      await cart.save();
      res.status(201).json(cart);
    }catch (err){
        console.error('❌ Error adding to cart:', err.message, err.stack);
        res.status(500).json({message:'Error adding to cart',error: err.message})
    }
});

router.post('/remove',async(req,res)=>{
    const {productId} = req.body;
    try {
        const cart = await Cart.findOne({userId: mockUserId});
        if(cart){
            cart.items = cart.items.filter(item=>!item.productId.equals(productId));
            await cart.save();
        }
        res.json(cart || {});
    } catch (err){
        res.status(500).json({message: 'Error removing item'});
    }
});

router.post('/clear',async(req,res)=>{
    try {
        await Cart.findOneAndDelete({userId: mockUserId});
        res.json({message:'Cart Cleared'});
    }catch (err){
        res.status(500).json({message: 'Error clearing cart'});
    }
});
module.exports = router;