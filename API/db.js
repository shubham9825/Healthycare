const { MongoClient } = require("mongodb");

require("dotenv").config({ path: "./env.env" });

let db;
const DB_URL = process.env.URL_DB;

async function connectDb() {
    // connection to the database
    const client = new MongoClient(DB_URL);
    await client.connect();

    db = client.db();
    console.log("Connected to database");
    return db;
}

async function getDbEmployee() {
    // getting employee data from database
    try {
        const emp = await db.collection("employeeList").find({ status: { $ne: "deleted" } }).toArray();
        return emp;
    } catch (error) {
        console.error('Error retrieving employee data:', error);
        return [];
    }
}

async function addDbEmployee(employee) {
    // Add employee data in the database
    await db.collection("employeeList").insertOne(employee);
}

// Calculate total employee from database
async function getTotal(name) {
    const result = await db
        .collection("totalEmployee")
        .findOneAndUpdate(
            { name: name },
            { $inc: { total: 1 } },
            { returnOriginal: false }
        );

    return result?.total;
}

module.exports = { connectDb, getDbEmployee, addDbEmployee, getTotal };
