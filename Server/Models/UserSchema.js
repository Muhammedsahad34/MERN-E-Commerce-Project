const mongoose = require('mongoose');
const collection = require('../Collections')
const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number
    }
    
});
const ProductModel = mongoose.model(collection.USER_COLLECTION,UserSchema);
module.exports = ProductModel;