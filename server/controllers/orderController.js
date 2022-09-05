const asyncHandler=require('express-async-handler');
const { default: mongoose } = require('mongoose');
const Order = require('../models/Ordermodel');

const addorderItem=asyncHandler(async(req,res)=>{
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalprice}=req.body;
    if(orderItems && orderItems.length===0){
        res.status(400);
        throw new Error('No order found');
    }
    else{
        const order=new Order({
            orderItems,
            User:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice
    })
    const createOrder=await order.save();
    res.status(201).json(createOrder)
    }
})

const getOrderById=asyncHandler(async(req,res)=>{
     const order=await Order.findById(req.params.id).populate('User','name email');
     if(order){
        res.json(order)
     }
     else{
        res.status(404);
        throw new Error('Order not found')
     }
})

// paidEndpoint
const updateOrderToPaid=asyncHandler(async(req,res)=>{
     const order=await Order.find(req.params.id);
     if(order){
        order.paidAt=Date.now();
        order.isPaid=true;
        order.paymentResult={
             id:req.body.id,
             status:req.body.status,
             update_time:req.body.update_time,
             email_address:req.body.email_address
        }
        const updateOrder=await Order.save();
        res.json(updateOrder)
     }else{
        res.status(404);
        throw new Error("Order not found")
     }
})
module.exports={addorderItem,getOrderById,updateOrderToPaid};