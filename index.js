require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MySQL_HOST,

  // Your port; if not 3306
  port: process.env.MySQL_PORT,

  // Your username
  user: process.env.MySQL_USER,

  // Be sure to update with your own MySQL password!
  password: process.env.MySQL_PASS,
  database: process.env.MySQL_DB,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!!!");
});
