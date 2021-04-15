const inquirer = require("inquirer");

const UserViewQuery = require("./view.js");
const view = new UserViewQuery();
const LogTable = require("./assets/logTable.js");
const tLog = new LogTable().log;

const connection = require("./assets/connection");

class UserAddQuery {
  async department() {
    const runPrompt = await inquirer.prompt([
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
    ]);

    const { newDepartment } = runPrompt;
    let newDept = `INSERT INTO department (name) VALUES('${newDepartment}')`;
    let selectDept = "SELECT * FROM department";

    const addDepartment = await connection.query(newDept);
    const viewDepartment = await connection.query(selectDept);
    tLog(viewDepartment);
  }

  async role() {
    let departments = "SELECT * FROM department";

    const deptData = await connection.query(departments);
    const deptIDs = deptData.map((row) => row.id);
    const deptNames = deptData.map((row) => row.name);

    const runPrompt = await inquirer.prompt([
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
        name: "dept",
        message: "What department would you like to add this role to?",
        choices: deptNames,
      },
    ]);

    const { role, role_salary, dept } = runPrompt;
    const newDeptID = deptIDs[deptNames.indexOf(dept)];
    const newRole = `INSERT INTO role(title, salary, department_id) VALUES('${role}', ${role_salary}, ${newDeptID})`;

    const addRole = await connection.query(newRole, () => {
      view.roles();
    });
  }

  async employee() {
    const roles = "SELECT * FROM role";
    const managers =
      "SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS dept FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id WHERE e.manager_id IS NULL";

    const roleData = await connection.query(roles);
    const roleIDs = roleData.map((row) => row.id);
    const roleTitle = roleData.map((row) => row.title);

    const managerData = await connection.query(managers);
    const managerIDs = managerData.map((row) => row.id);
    const managerName = managerData.map(
      (row) => `${row.first_name} ${row.last_name}`
    );
    managerIDs.push("NULL");
    managerName.push("NULL");

    const runPrompt = await inquirer.prompt([
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
        message: "What is the last name of the new employee?",
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
        choices: roleTitle,
      },
      {
        type: "list",
        name: "manager",
        message:
          "Who is the manager of the new employee? If employee IS a manager, select 'NULL'.",
        choices: managerName,
      },
    ]);
    const { newFirst, newLast, role, manager } = runPrompt;
    const employeeRole = roleIDs[roleTitle.indexOf(role)];
    const employeeManager = managerIDs[managerName.indexOf(manager)];

    const newEmployee = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('${newFirst}', '${newLast}', '${employeeRole}', ${employeeManager})`;

    const addEmployee = await connection.query(newEmployee, () => {
      view.employees();
    });
  }
}

module.exports = UserAddQuery;
