import express from 'express'
import _ from "lodash";
import catchError from '../utils.js';
import Order from "../models/order.model.js"
import CartList from '../models/cart.model.js';
const router = express.Router();

router.route("/:userId")
  .get(async (req, res, next) => {
    catchError(next, async () => {
      const { userId } = req.params;
      const orders = await Order.findById(userId).populate("orderList.product");
      res.json({
        success: true,
        orders
      });
    });
  })

  .post(async (req, res, next) => {
    catchError(next, async () => {
      const { userId } = req.params;
      const { orderItems } = req.body;
      let order = await Order.findById(userId);
      if(!order){
        const newOrder = new Order({ _id: userId, orderList:[orderItems]});
        newOrder.save();
        const savedItem = newOrder.orderList[newOrder.orderList.length - 1];
        return res.status(201).json({
          success: true,
          savedItem
         });
      }
      order.orderList.push(orderItems);
      await order.save();
      const savedItem = order.orderList[order.orderList.length - 1];
      const cartlist = await CartList.findById(userId);
      if (cartlist) {
          await CartList.deleteOne({ _id: cartlist._id });
      }
      res.status(201).json({
        success: true,
        savedItem
      });
    });
  })

  router.route("/:userId/:orderId")
  .get(async (req, res, next) => {
    catchError(next, async () => {
      const { userId, orderId } = req.params;
      let order = await Order.findOne({ _id: userId });
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }
      const orderIndex = order.orderList.findIndex((order) => order._id.toString() === orderId);
      if (orderIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }
      const populatedOrder = await Order.findOne({ _id: userId })
        .populate('orderList.items.product')
        .exec();

      const populatedItems = populatedOrder.orderList[orderIndex].items.map((item) => ({
        ...item.toObject(),
        product: item.product ? item.product.toObject() : null
      }));

      const populatedItem = {
        ...populatedOrder.orderList[orderIndex].toObject(),
        items: populatedItems
      };

      res.status(200).json({
        success: true,
        order: populatedItem
      });
    });
  });



export default router;