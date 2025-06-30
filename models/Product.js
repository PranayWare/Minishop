const mongoose = require ('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description : String,
    price: {
        type : Number,
        required : true,
        min : 0,
    },
    category: {
        type : String,
        required : true,
    },
    size : [String],
    colour : [String],
    brand : [String],
    stock : {
        type: Number,
        default : 0,
    },
    imageURL : String,
    isFeatured:{
        type : Boolean,
        default : false,
    },
    }, {
  timestamps: true
});
module.exports = mongoose.model('Product',productSchema);

