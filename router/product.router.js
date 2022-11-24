import express from 'express';
import Product from '../models/product.model.js';
import catchError from '../utils.js';
import User from '../models/user.model.js';

const router = express.Router();

router.route('/:userId')
.post(async (req, res, next) => {
        catchError(next, async () => {
        const user = await User.findById(req.params.userId);
        if(user.isAdmin){
            const newproduct = await Product.create(req.body);
            return res.status(201).json({
                success: true,
                message: "Product saved",
                newproduct
                })
        }
        res.json({
            success: false,
            message: "only admin can add product"
        });

        })
    })


router.route("/")
.get(async (req,res,next)=>{
    catchError(next, async()=>{
        const products = await Product.find({});
        res.json({
            success: true,
            products
          });
    })
})


router.get("/:id", async (req, res, next) => {

    catchError(next, async () => {
      const { id } = req.params;
      const product = await Product.findById(id);
      res.json({
        success: true,
        product
      });
    });
  })

export default router;