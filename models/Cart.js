const mongoose =  require('mongoose');
const cartSchema = new mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    items: [{
        productId:{type:mongoose.Schema.Types.ObjectId, ref :'Product'},
        quantity:{type:Number,default:1},
    }],
});
module.exports = mongoose.model('Cart',cartSchema);
const Cart = require ('../models/Cart.js');