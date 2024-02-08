const mongoose = require('mongoose');
const OrderModel = require('../Models/OrderSchema');

async function fetchOrderDetails(orderId){
    const orderDetails = await OrderModel.aggregate([
    
        {
          $match: { _id: new mongoose.Types.ObjectId(orderId)}
        },
        {
          $unwind:"$products"
        },
        {
          $lookup:{
            from:"products",
            localField:"products.item",
            foreignField:"_id",
            as:"productDetails"
          }
        },
        {
          $unwind:"$productDetails"
        },
        {
          $project: {
            _id: 1,
            user: 1,
            deliveryDetails: 1,
            total: 1,
            paymentMethod: 1,
            status: 1,
            date: 1,
            __v: 1,
            productDetails: 1
          }
        },
        {
          $group: {
            _id: {
              _id: "$_id",
              user: "$user",
              deliveryDetails: "$deliveryDetails",
              total: "$total",
              paymentMethod: "$paymentMethod",
              status: "$status",
              date: "$date",
              __v: "$__v",
            },
            productDetails: { $push: "$productDetails" }
          }
        },
        {
          $project: {
            _id: "$_id._id",
            user: "$_id.user",
            deliveryDetails: "$_id.deliveryDetails",
            total: "$_id.total",
            paymentMethod: "$_id.paymentMethod",
            status: "$_id.status",
            date: "$_id.date",
            __v: "$_id.__v",
            productDetails: 1
          }
        }
        
        
      ]);
      return orderDetails;
}
module.exports = fetchOrderDetails;