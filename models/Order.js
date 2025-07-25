const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    products : [{
        productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: Number
    }],
    totalAmount: Number,
    status: {type: String, default: 'Pending'},
    createdAt: {type: Date, default: Date.now} 
});
module.exports = mongoose.model('Order',orderSchema);
const Order = require('./Order.js');