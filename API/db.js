import dotenv from "dotenv";
import { default as mongoose } from "mongoose";

dotenv.config({ path: "./env.env" });

let db;
const DB_URL = process.env.URL_DB;

const connectDB = async () => {
        try{
            await mongoose.connect(DB_URL);
            console.log("Connected to Databse");
        }
        catch{
            console.error("Connection to Mongodb Failed ", error.message);
            process.exit(1);
        }
};

export default connectDB;
