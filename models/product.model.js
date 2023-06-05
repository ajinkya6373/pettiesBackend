
import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required!",
        // maxLength: 50
    },

    price: {
        type: Number,
        required: "Price is required!"
    },

    description: {
        type: String,
        trim: true,
        required: "Description is required!",
    },

    imageUrl: {
        type: String,
        trim: true,
        required: "Product image url is required!"
    },

    stock: {
        type: Number,
        required: "Stock of product is required!",
    },

    assuredDelivery: {
        type: Boolean,
        required: true,
        default: false
    },

    discountPercentage: {
        type: Number,
        default: 0,
    },

    rating: {
        type: String,
        trim: true,
        default: "0",
    },

    onSale: {
        type: Boolean,
        default: false,
    },

    category: {
        type: String,
        trim: true,
        enum: ["Food", "Health Care", "Grooming", "Accessories", "Bowls & Feeders", "Toys", "Clothes","Aquarium Decor"],
        required: "Product category is required!"
    },
    pets:{
        type:[String],
        trim:true,
        default:["Dog","Cat","Fish","Bird","Hamster","Other"],
        required: "pets category is required!"
    }

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;