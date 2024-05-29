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

async function getDbRetirment() {
    // getting retired employee data from database
    try {
        const employees = await db?.collection("employeeList").find({ status: { $ne: "deleted" } }).toArray();

        const today = new Date(); // Get today's date

        // Calculate the date six months from now
        const sixMonthsFromNow = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());

        // Filter employees whose retirement is within the next six months
        const retirementEmp = employees.filter(employee => {
            const retirementDate = new Date(employee?.dob);
            retirementDate.setFullYear(retirementDate.getFullYear() + 65);
            return retirementDate <= sixMonthsFromNow;
        });

        return retirementEmp;
    } catch (error) {
        console.error('Error retrieving employee data:', error);
        return [];
    }
}

async function addDbEmployee(employee) {
    // Add employee data in the database
    await db.collection("employeeList").insertOne(employee);
}

// delete employee
async function deleteDbEmployee(id) {
    try {
        const employee = await db.collection("employeeList").findOne({ id: parseInt(id) });

        if (employee && employee.currentStatus === 1) {
            // Employee's status is active, cannot delete
            return { success: false, message: "Can't delete employee - Status active" };
        }

        await db.collection("employeeList").updateOne(
            { id: parseInt(id) },
            { $set: { status: "deleted" } }
        );
        return { success: true, message: "Employee deleted successfully" };
    } catch (error) {
        console.error('Error deleting employee:', error);
        return { success: false, message: "An error occurred while deleting the employee" };
    }
}

// search employee
async function searchDbEmployee(firstname) {
    try {
        const allEmployees = await db.collection("employeeList").find({ status: { $ne: "deleted" } }).toArray();
        const filteredEmployees = allEmployees.filter(employee => employee.firstname === firstname);
        return filteredEmployees;
    } catch (error) {
        console.error('Error deleting employee:', error);
        return [];
    }
}

// search retired employee
async function searchDbRetirement(employeeType) {
    try {
        const employees = await db?.collection("employeeList").find({ status: { $ne: "deleted" }, employeeType: employeeType }).toArray();
        const today = new Date();

        const sixMonthsFromNow = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());

        const retirementEmp = employees.filter(employee => {
            const retirementDate = new Date(employee?.dob);
            retirementDate.setFullYear(retirementDate.getFullYear() + 65);
            return retirementDate <= sixMonthsFromNow;
        });

        return retirementEmp;
    } catch (error) {
        console.error('Error deleting employee:', error);
        return [];
    }
}

// edit employee
async function editDbEmployee(id, employee) {
    try {
        const result = await db.collection("employeeList").findOneAndUpdate(
            { id: id },
            { $set: employee },
            { returnOriginal: false }
        );
        if (result) {
            return result;
        } else {
            throw new Error("Employee not found");
        }
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
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

module.exports = { connectDb, getDbEmployee, addDbEmployee, getTotal, deleteDbEmployee, searchDbEmployee, editDbEmployee, getDbRetirment, searchDbRetirement };
