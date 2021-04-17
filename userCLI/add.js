// including npm Inquirer package
const inquirer = require("inquirer");
// incuding npm console.table package
const LogTable = require("./assets/logTable.js");
// new instance of LogTable().log
const tLog = new LogTable().log;
// including UserViewQuery class
const UserViewQuery = require("./view.js");
// new instance of UserViewQuery()
const view = new UserViewQuery();
// including connection requirements needed to connect to db
const connection = require("./assets/connection");

// constructor class used to create 'add' query methods
class UserAddQuery {
  // method to add a new department
  async department() {
    // waiting to run inquirer.prompt to determine new department data
    const runPrompt = await inquirer.prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What department would you like to add?",
        // validating that the user has inputed an answer
        validate: (newDepartment) => {
          return newDepartment
            ? true
            : console.log("Please input a new department.");
        },
      },
    ]);
    // declaring newDepartment from runPrompt
    const { newDepartment } = runPrompt;
    // query to add new department to department table
    const newDept = `INSERT INTO department (name) VALUES('${newDepartment}')`;
    // query to view department data
    const selectDept = "SELECT * FROM department";
    // connecting to db to add department to table
    const addDepartment = await connection.query(newDept);
    // connecting to db to view updated department data
    const viewDepartment = await connection.query(selectDept);
    // console.table logging viewDepartment
    tLog(viewDepartment);
  }

  // method to add a new role
  async role() {
    // query to get department data
    let departments = "SELECT * FROM department";
    // connecting to db to get department data
    const deptData = await connection.query(departments);
    // setting department IDs into an array
    const deptIDs = deptData.map((row) => row.id);
    // setting department names into an array
    const deptNames = deptData.map((row) => row.name);
    // waiting to run inquirer.prompt to determine new role data
    const runPrompt = await inquirer.prompt([
      {
        type: "input",
        name: "role",
        message: "What role would you like to add?",
        // validating that the user has inputed an answer
        validate: (role) => {
          return role ? true : console.log("Please input a new role.");
        },
      },
      {
        type: "input",
        name: "role_salary",
        message: "What is the salary of the new role?",
        // validating that the user has inputed an answer
        validate: (role_salary) => {
          return role_salary ? true : console.log("Please input a salary.");
        },
      },
      {
        type: "list",
        name: "dept",
        message: "What department would you like to add this role to?",
        // passing through deptNames array for choices
        choices: deptNames,
      },
    ]);
    // declaring role, role_salary, dept from runPrompt
    const { role, role_salary, dept } = runPrompt;
    // determing the department ID of the new role
    const newDeptID = deptIDs[deptNames.indexOf(dept)];
    // query to add new role to table data
    const newRole = `INSERT INTO role(title, salary, department_id) VALUES('${role}', ${role_salary}, ${newDeptID})`;
    // connecting to db to add new role
    const addRole = await connection.query(newRole);
    // connecting to db to view updated role data
    const viewRoles = await view.roles();
  }

  // method to add an employee
  async employee() {
    // query to get role data
    const roles = "SELECT * FROM role";
    // query to get all manager data
    const managers =
      "SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS dept FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id WHERE e.manager_id IS NULL";
    // connecting to db to get role data
    const roleData = await connection.query(roles);
    // setting role IDs into an array
    const roleIDs = roleData.map((row) => row.id);
    // setting role titles into an array
    const roleTitle = roleData.map((row) => row.title);
    // connecting to db to get manager data
    const managerData = await connection.query(managers);
    // setting manager IDs into an array
    const managerIDs = managerData.map((row) => row.id);
    // setting manager names into an array
    const managerName = managerData.map(
      (row) => `${row.first_name} ${row.last_name}`
    );
    // pushing 'NULL' into managerIDs and managerName array
    managerIDs.push("NULL");
    managerName.push("NULL");
    // waiting to run inquirer.prompt
    const runPrompt = await inquirer.prompt([
      {
        type: "input",
        name: "newFirst",
        message: "What is the first name of the new employee?",
        // validating that the user has inputed an answer
        validate: (newFirst) => {
          return newFirst
            ? true
            : console.log("Please input the first name of the new employee.");
        },
      },
      {
        type: "input",
        name: "newLast",
        message: "What is the last name of the new employee?",
        // validating that the user has inputed an answer
        validate: (newLast) => {
          return newLast
            ? true
            : console.log("Please input the first name of the new employee.");
        },
      },
      {
        type: "list",
        name: "role",
        message: "What is the new employee's role?",
        // passing roleTitle array through as choices
        choices: roleTitle,
      },
      {
        type: "list",
        name: "manager",
        message:
          "Who is the manager of the new employee? If employee IS a manager, select 'NULL'.",
        // passing managerName array through as choices
        choices: managerName,
      },
    ]);
    // declaring newFirst, newLast, role, manager from runPrompt
    const { newFirst, newLast, role, manager } = runPrompt;
    // determing the ID of the selected employee
    const employeeRole = roleIDs[roleTitle.indexOf(role)];
    // determing the ID of the selected manager
    const employeeManager = managerIDs[managerName.indexOf(manager)];
    // query to add new employee data
    const newEmployee = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('${newFirst}', '${newLast}', '${employeeRole}', ${employeeManager})`;
    // connecting to db to update employee table
    const addEmployee = await connection.query(newEmployee);
    // viewing the updated employee table
    const viewEmployees = await view.employees();
  }
}

// exporting UserAddQuery class
module.exports = UserAddQuery;
