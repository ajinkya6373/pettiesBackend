import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:"Name is required"
    },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Email is required!"
  },

  password: {
    type: String,
    trim: true,
    required: "Password is required!"
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;