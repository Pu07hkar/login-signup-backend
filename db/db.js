import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/LOGIN`)
        console.log("MongoDB Connected ", connectionInstance.connection.host);
    }catch(err){
        console.error(err);
        process.exit(1);
    }
}

export default connectDB;