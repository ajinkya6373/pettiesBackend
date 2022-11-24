import express from "express";
import _ from "lodash";
const router = express.Router();
import catchError from '../utils.js';
import CartList from "../models/cart.model.js";


router.route("/:userId")
    .get(async (req, res, next) => {
        catchError((next), async () => {
            const { userId } = req.params;
            const cartlist = await CartList.findById(userId).populate('cartItems.product');
            console.log(cartlist);
            res.status(201).json({
                success: true,
                cartlist
            });
        });
    })

    .post(async (req, res, next) => {
        catchError(next, async () => {
            const { userId } = req.params;
            const { product } = req.body;
            let cartlist = await CartList.findById(userId);
            if (!cartlist) {
                const newCart = new CartList({ _id: userId, cartItems: [{ product: product._id, quantity: 1 }] })
                await newCart.save();
                return res.status(201).json({
                    success: true,
                    newCart
                });
            }
            cartlist = _.extend(cartlist, { cartItems: _.concat(cartlist.cartItems, { product: product._id, quantity: 1 }) });
            await cartlist.save();

            res.status(201).json({
                success: true,
                cartlist
            });
        })
    })

    router.route("/:userId/:productId")
    .post(async (req, res, next) => {
      catchError(next, async () => {
        const { userId, productId } = req.params;
        const { quantity } = req.body;
        let cartlist = await CartList.findById(userId);
  
        cartlist = _.extend(cartlist, {
          cartItems: _.map(cartlist.cartItems, (item) =>
            item.product.toString() === productId ?
              _.extend(item, { quantity: quantity })
              : item
          )
        });
        await cartlist.save();
        res.json({
          success: true,
          cartlist
        });
      });
    })
  
    .delete(async (req, res, next) => {
  
      catchError(next, async () => {
        const { userId, productId } = req.params;
        let cartlist = await CartList.findById(userId);
  
        cartlist = _.extend(cartlist, { cartItems: _.filter(cartlist.cartItems, (item) => item.product.toString() !== productId) })
        await cartlist.save();
  
        res.json({
          success: true,
          cartlist
        });
      });
  
    });




export default router
