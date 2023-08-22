const mongoose = require('mongoose');
const collection = require('../Collections');
const ProductModel = require('./ProductSchema');
const CartSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    products:[{
        item:{
        type:mongoose.Schema.Types.ObjectId,
        ref:ProductModel
        },
        count:{
            type:Number
        }
    }]
});

const CartModel = mongoose.model(collection.CART_COLLECTION,CartSchema);
module.exports = CartModel;