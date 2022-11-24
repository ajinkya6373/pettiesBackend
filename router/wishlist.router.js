import express from 'express'
import _ from "lodash";
import catchError from '../utils.js';
import WishList from "../models/wishlist.model.js"
const router = express.Router();


router.route("/:userId")
  .get(async (req, res, next) => {
    catchError(next, async () => {
      const { userId } = req.params;
      const wishlist = await WishList.findById(userId).populate('wishListItems');
      res.json({
        success: true,
        wishlist
      });
    });
  })

  .post(async (req, res, next) => {
    catchError(next, async () => {
      const { userId } = req.params;
      const { product } = req.body;
      let wishlist = await WishList.findById(userId);

      if (!wishlist) {
        const newWishlist = new WishList({ _id: userId, wishListItems: [product._id] })
        await newWishlist.save();
        return res.status(201).json({
          success: true,
          newWishlist
        });
      }

      if(!wishlist.wishListItems.includes(product._id)){
        wishlist = _.extend(wishlist, { wishListItems: _.concat(wishlist.wishListItems, product._id) });
        await wishlist.save();
       return res.status(201).json({
          success: true,
          wishlist
        });
      }
      return res.status(409).json({
        success:false,
        message: "product is already in wishlist",
      })
  

    });
  });



router.route("/:userId/:productId")
  .delete(async (req, res, next) => {
    catchError(next, async () => {
      const { userId, productId } = req.params;
      let wishlist = await WishList.findById(userId);

      wishlist = _.extend(wishlist, {
        wishListItems: _.filter(wishlist.wishListItems, (item) => item.toString() !== productId)
      });

      await wishlist.save();

      res.json({
        success: true,
        wishlist
      });
    });

  });


export default router