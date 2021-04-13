const inquirer = require("inquirer");
const UserViewQuery = require("./view.js");
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
        let selectRoles = "SELECT * FROM role";
        connection.query(newRole, (err, res) => {
          connection.query(selectRoles, (err, res) => {
            tLog(res);
          });
        });
      });
  }

  addEmployee() {
    let roles = "SELECT * FROM role";
    let managers =
      "SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS dept FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id WHERE e.manager_id IS NULL";
    let roleList = [];
    let managerList = ["NULL"];
    const util = require("util");
    const setTimeoutPromise = util.promisify(setTimeout);
    connection.query(roles, (err, res) => {
      res.forEach(({ id }, i) => {
        roleList.push(id);
        i++;
      });
      console.log("\n================ Roles ================");
      tLog(res);
    });
    connection.query(managers, (err, res) => {
      res.forEach(({ id }, i) => {
        managerList.push(id);
        i++;
      });
      console.log("\n================ Managers ================");
      tLog(res);
    });

    setTimeoutPromise(15).then(() => {
      inquirer
        .prompt([
          {
            type: "input",
            name: "newFirst",
            message: "What is the first name of the new employee?",
            validate: (newFirst) => {
              return newFirst
                ? true
                : console.log(
                    "Please input the first name of the new employee."
                  );
            },
          },
          {
            type: "input",
            name: "newLast",
            message: "What is the last name of the new employee?",
            validate: (newLast) => {
              return newLast
                ? true
                : console.log(
                    "Please input the first name of the new employee."
                  );
            },
          },
          {
            type: "list",
            name: "roleID",
            message: "What is the role id for the new employee?",
            choices: roleList,
          },
          {
            type: "list",
            name: "managerID",
            message:
              "What is the new employee's manager's ID? If employee is a manager, select 'NULL'.",
            choices: managerList,
          },
        ])
        .then((answer) => {
          const { newFirst, newLast, roleID, managerID } = answer;
          let newEmployee = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('${newFirst}', '${newLast}', '${roleID}', ${managerID})`;
          connection.query(newEmployee, (err, res) => {
            if (err) throw err;
            new UserViewQuery().viewEmployees();
          });
        });
    });
  }
}

module.exports = UserAddQuery;
