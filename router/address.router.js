import express from "express";
import _ from "lodash";
const router = express.Router();
import catchError from '../utils.js';
import Address from "../models/address.model.js";


router.route("/:userId")
  .get(async (req, res, next) => {
    catchError(next, async () => {
      const { userId } = req.params;
      const addressList = await Address.findById(userId);
      res.json({
        success: true,
        addressList
      });
    });
  })

  .post(async (req, res, next) => {
    catchError(next, async () => {
      const { userId } = req.params;
      const { newAddress } = req.body;
      let address = await Address.findById(userId);
      if (!address) {
        const newUserAddress = new Address({ _id: userId, addressList: [{ ...newAddress }] });
        newUserAddress.save();
        return res.status(201).json({
          success: true,
          address:newUserAddress
        })
      }
      address = _.extend(address, {
        addressList: _.concat(address.addressList, {
          ...newAddress
        })
      });
      await address.save();
      res.status(201).json({
        success: true,
        address:address.addressList[address.addressList.length - 1] 
      })
    });
  });


router.route("/:userId/:addressId")
  .get(async (req, res, next) => {
    catchError(next, async () => {
      const { userId, addressId } = req.params;
      const addresses = await Address.findById(userId);
      const address = _.find(addresses.addressList, (address) => address._id.toString() === addressId);

      return res.json({
        success: true,
        address
      });
    });
  })

  .post(async (req, res, next) => {
    catchError(next, async () => {
      const { userId, addressId } = req.params;
      const { addressUpdate } = req.body;
      let address = await Address.findById(userId);
      address = _.extend(address, {
        addressList: _.map(address.addressList, addObj =>
          addObj._id.toString() === addressId ?
            _.extend(addObj, { ...addressUpdate })
            :
            addObj
        )
      });
      address.save();
      return res.json({
        success: true,
        address
      });
    });
  })


  .delete(async (req, res, next) => {
    catchError(next, async () => {
      const { userId, addressId } = req.params;
      let address = await Address.findById(userId);

      address = _.extend(address, {
        addressList: _.filter(address.addressList, ({ _id }) =>
          _id.toString() !== addressId)
      });

      address.save();
      res.json({
        success: true,
        address
      });
    });
  })

export default router;