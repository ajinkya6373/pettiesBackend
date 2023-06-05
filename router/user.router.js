import express from 'express'
import User from '../models/user.model.js';
import _ from "lodash";
import catchError from '../utils.js';
const router = express.Router();

router.route("/")
  .post(async (req, res, next) => {
    catchError(next, async () => {
      const { user: { email, password } } = req.body;
      const user = await User.findOne({email});
      if (user && user.password === password) {
        return res.json({
          success: true,
          user: _.pick(user, ["_id", "name", "email"])
        });
      }

      res.json({
        success: false,
        message: "User not found!"
      });
    });
  })

router.route("/:userId")
  .get(async (req, res, next) => {
    catchError(next, async () => {
      const userId  = req.params.userId;
      let user = await User.findById(userId);
      user =_.pick(user, ["_id", "name", "email"]);
      res.json({
        success: true,
        user  
      });
    });
  })

  
  router.route("/new")
  .post(async (req, res,next) => {
    catchError(next, async () => {
    
      const {user}  = req.body;
      let newUser = new User(user);
      newUser = await newUser.save();
  
      res.status(200).json({
        success: true,
        user: _.pick(newUser, ["_id", "name", "email"])
      });
    }, (err) => {
      if(err.code === 11000){
        return res.status(400).json({
          success: false,
          message: "Email already in use. Try a different one."
        });
      }
    return  res.status(500).json({
        success: false,
        message: err.message
      });
    });
  });

export default router;

