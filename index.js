require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql");
var figlet = require("figlet");

const initApp = require("./userCLI/init.js");

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

figlet("Employee", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);

  figlet("Manager", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
});
connection.connect((err) => {
  if (err) throw err;
  const app = new initApp();
  app.init();
});
