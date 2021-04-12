const inquirer = require("inquirer");
const cTable = require("console.table");
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

class UserViewQuery {
  viewDepartment() {
    let departments = "SELECT * FROM department";
    let deptList = [];
    connection.query(departments, (err, res) => {
      res.forEach(({ name }, i) => {
        deptList.push(name);
        i++;
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "dept",
            message: "What department would you like to view?",
            choices: deptList,
          },
        ])
        .then((answer) => {
          const { dept } = answer;
          // view employee by department
          // let employees = `SELECT e.id, e.first_name, e.last_name, r.title AS role, r.salary, d.name AS department FROM employee e JOIN role r	ON e.role_id = r.id JOIN department d	ON r.department_id = d.id	WHERE d.name = ${dept}`;
        });
    });
  }
}

module.exports = UserViewQuery;