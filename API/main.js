const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: "./env.env" });

const { connectDb, getDbEmployee, addDbEmployee, getTotal } = require("./db");

const { ApolloServer } = require("apollo-server-express");

// graphql schema
const userSchema = fs.readFileSync("./graphqlSchema", "utf-8");

function getEmployeeRecord() {
    return getDbEmployee();
}

async function addEmployee(_, { employee }) {
    employee.id = await getTotal("Employee");
    await addDbEmployee(employee);
    return employee;
}

const myres = {
    Query: {
        employeeList: getEmployeeRecord
    },
    Mutation: {
        addEmployee,
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

