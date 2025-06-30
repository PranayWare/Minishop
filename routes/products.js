const express = require ('express');
const router = express.Router();
const Product = require('../models/Product.js');

// Create Product (POST)




























































































































router.post('/',async(req,res)=>{
    try{
        const {name,price,category} =  req.body
        const newProduct = new Product({name,price,category});
        await newProduct.save();
        res.status(201).json({message : 'Product created', product : newProduct});
    }
    catch (err) {
        res.status(500).json({message : err.message});
    }
});

// Get All Products (GET)
router.get('/',async(req,res)=>{
    try{
        const products = await Product.find();
        res.json(products);
    }
    catch (err){
        res.status(500).json({message : err.message});
    }
});

// Get One Product by ID (GET)
router.get('/:id',async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message : 'Product Not Found'});
        }  
        res.json(product);
    }
    catch (err){
        res.status(500).json({message : err.message});
    }
});

// Update Product (PUT)
router.put('/:id',async(req,res)=>{
    try{
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if(!updated){
            return res.status(404).json({message : 'Product Not Updated'});
        }
        res.json(updated);
    }
    catch (err){
        res.status(500).json({message : err.message});
    }
});

// Delete Product (DELETE)
router.delete('/:id',async(req,res)=>{
    try{
        await Product.findByIdandDelete(req.params.id);
        res.json({message : 'Product deleted'});
    }
    catch (err){
        res.status(500).json({message : 'Product deleted'})
    }
});

module.exports = router;