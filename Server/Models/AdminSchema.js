const mongoose = require('mongoose');
const collection = require('../Collections');
const AdminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const AdminModel = mongoose.model(collection.ADMIN_COLLECTION,AdminSchema);
module.exports = AdminModel;