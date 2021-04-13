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
    let departments = "SELECT * FROM department";
    let deptList = [];
    connection.query(departments, (err, res) => {
      res.forEach(({ id }, i) => {
        deptList.push(id);
        i++;
      });
      console.log(deptList);
      tLog(res);
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "role",
          message: "What role would you like to add?",
          validate: (role) => {
            return role ? true : console.log("Please input a new role.");
          },
        },
        {
          type: "input",
          name: "role_salary",
          message: "What is the salary of the new role?",
          validate: (role_salary) => {
            return role_salary ? true : console.log("Please input a salary.");
          },
        },
        {
          type: "list",
          name: "dept_id",
          message:
            "What department would you like to add this role to? (Reference department table above)",
          choices: deptList,
        },
      ])
      .then((answer) => {
        const { role, role_salary, dept_id } = answer;
        let newRole = `INSERT INTO role(title, salary, department_id) VALUES('${role}', '${role_salary}', '${dept_id}')`;
        let selectRole = "SELECT * FROM role";
        connection.query(newRole, (err, res) => {
          connection.query(selectRole, (err, res) => {
            tLog(res);
          });
        });
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
