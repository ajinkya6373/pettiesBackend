import express from "express";
import CartList from "../models/cart.model.js";
import WishList from "../models/wishlist.model.js";
import Order from "../models/order.model.js";
import Address from "../models/address.model.js";
import catchError from "../utils.js";
const router = express.Router();

router.get("/:userId",async (req,res,next)=>{
    catchError(next, async()=>{
        const {userId}= req.params;
        const [cart,wishlist,order,address] = await Promise.all([
            CartList.findById(userId).populate('cartItems.product'),
            WishList.findById(userId).populate('wishListItems'),
            Order.findById(userId),
            Address.findById(userId)
        ]);
        
    res.json({
        success: true,
        cartList: cart && cart.cartItems,
        wishList: wishlist && wishlist.wishListItems,
        orderList: order && order.orderList,
        addressList: address && address.addressList,
      });

    })
})



export default router;


