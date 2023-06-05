import mongoose from 'mongoose';
import { addressSchema } from './address.model.js';

const productSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId, ref: "Product"
  },
  name:{
    type:String
  },
  imageUrl:{
    type:String
  },
  price:{
    type:String
  },
  quantity: {
    type: Number, 
    required: "Quantity is required!"
  },
  discountPercentage: {
    type: Number,
    default: 0,
},
})

const orderSchema = mongoose.Schema({
  items:[productSchema],
  deliveryAddress:addressSchema,
  paymentMethod: {
    type: mongoose.Schema.Types.ObjectId
  }
},{ timestamps: true });


const orderListSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  },
  orderList: [orderSchema]
}, { timestamps: true });

const Order = mongoose.model('Order', orderListSchema);

export default Order;
