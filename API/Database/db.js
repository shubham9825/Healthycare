import dotenv from "dotenv";
import { default as mongoose } from "mongoose";

dotenv.config({ path: "./env.env" });


console.log("I am in a database");
const DB_URL = process.env.URL_DB;
console.log('MONGO_URI:', DB_URL);

const connectDB = async () => {
        try{
            await mongoose.connect(DB_URL);
            console.log("Connected to Databse");
        }
        catch (err){
            console.error("Connection to Mongodb Failed ", err.message);
            process.exit(1);
        }
};

export default connectDB;
