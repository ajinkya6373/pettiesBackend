import express from 'express'
import Pets from '../models/pets.model.js';
import catchError from '../utils.js';
import User from '../models/user.model.js';
const router = express.Router();

router.route("/:userId")
    .post(async(req,res,next)=>{
        catchError(next, async () => {
            const userId = req.params.userId;
            const user = await User.findById(userId);
            if(user.isAdmin){
                const pet = await Pets.create(req.body);
            return res.status(200).json({
                    success: true,
                    pet
                });
            }
            res.json({
                success: false,
                message: "only admin can add pets"
            });
        })
    });


router.route("/")
    .get(async(req,res,next)=>{
        catchError(next, async () => {
            const pets = await Pets.find();
            res.status(200).json({
                success: true,
                pets
            });
        })
    });

export default router;