const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: "./env.env" });

const { connectDb, getDbEmployee, addDbEmployee, getTotal, deleteDbEmployee, searchDbEmployee, editDbEmployee, getDbRetirment, searchDbRetirement } = require("./db");

const { ApolloServer } = require("apollo-server-express");

// graphql schema
const userSchema = fs.readFileSync("./graphqlSchema", "utf-8");

function getEmployeeRecord() {
    return getDbEmployee();
}

function getRetirementList() {
    return getDbRetirment();
}

async function addEmployee(_, { employee }) {
    employee.id = await getTotal("Employee");
    await addDbEmployee(employee);
    return employee;
}

function deleteEmployee(_, { id }) {
    return deleteDbEmployee(id);
}

function searchEmployee(_, { firstname }) {
    return searchDbEmployee(firstname);
}

function searchRetirmentList(_, { employeeType }) {
    return searchDbRetirement(employeeType);
}

async function editEmployee(_, { id, employee }) {
    try {
        const updatedEmployee = await editDbEmployee(id, employee);
        return updatedEmployee;
    } catch (error) {
        console.error('Error editing employee:', error);
        throw error;
    }
}

const myres = {
    Query: {
        employeeList: getEmployeeRecord,
        retirementList: getRetirementList,
        searchEmployee,
        searchRetirmentList

    },
    Mutation: {
        addEmployee,
        deleteEmployee,
        editEmployee
    },
};

// getting api port from env file
const appPort = process.env.API_PORT;
const server = new ApolloServer({ typeDefs: userSchema, resolvers: myres });

// stating the server
server.start().then((res) => {
    let Cors = false;
    // handle cors
    server.applyMiddleware({ app, path: "/graphql", Cors });
    app.listen(appPort, () => {
        console.log(`server started at port: ${appPort}`);
        connectDb();
    });
});

