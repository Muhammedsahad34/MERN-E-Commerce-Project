const mongoose = require('mongoose');
const collection = require('../Collections');
const ProductModel = require('./ProductSchema');
const UserModel = require("./UserSchema")
const OrderSchema = new mongoose.Schema({
user:{
        type:String,
        required:true,
    },
    deliveryDetails:{
        adress:{
            type:String,
            required:true
        },
        pincode:{
            type:Number,
            required:true
        },
        number:{
            type:Number,
            required:true
        }
    },
    products:[{
        item:{
        type:mongoose.Schema.ObjectId,
        ref:ProductModel,
        required:true
        },
        count:{
            type:Number
        }
    }],
    total:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
    
});
const OrderModel = mongoose.model(collection.ORDER_COLLECTION,OrderSchema);
module.exports = OrderModel;