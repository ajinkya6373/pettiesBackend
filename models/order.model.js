import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId, ref: "Product"
  },
  quantity: {
    type: Number, 
    required: "Quantity is required!"
  },
  deliveryAddress: {
    type: mongoose.Schema.Types.ObjectId
  },
  paymentMethod: {
    type: mongoose.Schema.Types.ObjectId
  }
});


const orderListSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  },
  orderList: [orderSchema]
}, { timestamps: true });

const Order = mongoose.model('Order', orderListSchema);

export default Order;
