
import mongoose from 'mongoose';

const dbURL = process.env.dbURL;
 const connectDb = () => {
    mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log(`connected to Mongodb`)
    }).catch((err)=>{
        console.log(`connection Fail due to ${err}`)
    })
}
export default connectDb;