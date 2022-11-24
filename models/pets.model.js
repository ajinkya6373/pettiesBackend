
import mongoose from "mongoose";

const petsSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required: "Name is required!",
        maxLength: 50
    },
    services: {
        type: [String],
        default:["Food", "Health Care", "Grooming", "Accessories", "Bowls & Feeders", "Toys", "Clothes","Aquarium Decor"],
        required: "Pet services is required!"
    }
},{ timestamps: true });

const Pets = mongoose.model('Pets', petsSchema);
export default Pets;

