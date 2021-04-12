const inquirer = require("inquirer");
const LogTable = require("./assets/logTable.js");
const tLog = new LogTable().log;

require("dotenv").config();

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

class UserAddQuery {
  addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "newDepartment",
          message: "What department would you like to add?",
          validate: (newDepartment) => {
            return newDepartment
              ? true
              : console.log("Please input a new department.");
          },
        },
      ])
      .then((data) => {
        const { newDepartment } = data;
        let newDept = `INSERT INTO department(name) VALUES('${newDepartment}')`;
        let selectDept = "SELECT * FROM department";
        connection.query(newDept, (err, res) => {
          connection.query(selectDept, (err, res) => {
            tLog(res);
          });
        });
      });
  }

  addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "newRole",
          message: "What role would you like to add?",
          validate: (newRole) => {
            return newRole ? true : console.log("Please input a new role.");
          },
        },
      ])
      .then((answer) => {
        const { newRole } = answer;
        console.log(newRole);
      });
  }

  addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "newFirst",
          message: "What is the first name of the new employee?",
          validate: (newFirst) => {
            return newFirst
              ? true
              : console.log("Please input the first name of the new employee.");
          },
        },
        {
          type: "input",
          name: "newLast",
          message: "What is the first name of the new employee?",
          validate: (newLast) => {
            return newLast
              ? true
              : console.log("Please input the first name of the new employee.");
          },
        },
      ])
      .then((answer) => {
        const { newFirst, newLast } = answer;
        console.log(newFirst, newLast);
      });
  }
}

module.exports = UserAddQuery;
