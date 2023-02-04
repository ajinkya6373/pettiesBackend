import express from 'express'
import cors from "cors";
import bodyParser from 'body-parser';
import 'dotenv/config'
import connectDb from "./db/db.connect.js";
import userRouter from "./router/user.router.js";
import petsRoute from "./router/pets.router.js";
import productRoute from "./router/product.router.js"
import cartRoute from "./router/cart.router.js";
import wishlistRoute from "./router/wishlist.router.js";
import orderRoute from "./router/order.router.js";
import addressRoute from "./router/address.router.js"
import userDataRoute from "./router/userData.router.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SK);
import { v4 as uuidv4 } from 'uuid'
import path from "path";
const PORT = 4000;
const app = express();
const __dirname = path.resolve()
// const path = require('path')

// app.use(express.static(path.join(__dirname, 'build')))
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'build','index.html'));

// })


app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/pets", petsRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/wishlist", wishlistRoute);
app.use("/orders", orderRoute);
app.use("/address", addressRoute);
app.use("/userData", userDataRoute);



//stripe 
app.post("/payment", async (req, res) => {
    const { product, token } = req.body;
    const idempotencyKey = uuidv4();
    console.log(token);
    await stripe.customers.create({
        email: token.email,
        source: token.id,
        name: 'ajinkya jadhav',
        address: {
            line1: '510 Townsend St',
            postal_code: '98140',
            city: 'San Francisco',
            state: 'CA',
            country: 'US',
        }
        
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, { idempotencyKey: idempotencyKey })


    }).then((result) => {
        res.status(200).json(result)
    }).catch(err => console.log(err));


})

connectDb();
app.listen(process.env.PORT || PORT, () => {
    console.log(`server started at ${PORT} port`);
})
