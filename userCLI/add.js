const inquirer = require("inquirer");

const UserViewQuery = require("./view.js");
const view = new UserViewQuery();
const LogTable = require("./assets/logTable.js");
const tLog = new LogTable().log;

const connection = require("./assets/connection");

class UserAddQuery {
  async addDepartment() {
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

  async addRole() {
    let departments = "SELECT * FROM department";

    console.log("\n================ DEPARTMENTS ================");
    const deptData = await connection.query(departments);
    const deptList = deptData.map((row) => row.id);
    tLog(deptData);

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
        name: "dept_id",
        message:
          "What department would you like to add this role to? (Reference department table above)",
        choices: deptList,
      },
    ]);

    const { role, role_salary, dept_id } = runPrompt;
    let newRole = `INSERT INTO role(title, salary, department_id) VALUES('${role}', '${role_salary}', '${dept_id}')`;

    connection.query(newRole, () => {
      view.viewRoles();
    });
  }

  async addEmployee() {
    const roles = "SELECT * FROM role";
    const managers =
      "SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS dept FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id WHERE e.manager_id IS NULL";

    console.log("\n================ Roles ================");
    const roleData = await connection.query(roles);
    const roleList = roleData.map((row) => row.id);
    tLog(roleData);

    console.log("\n================ MANAGERS ================");
    const managerData = await connection.query(managers);
    const managerList = managerData.map((row) => row.id);
    managerList.push("NULL");
    tLog(managerData);

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
    ]);
    const { newFirst, newLast, roleID, managerID } = runPrompt;
    let newEmployee = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('${newFirst}', '${newLast}', '${roleID}', ${managerID})`;

    const addEmployee = await connection.query(newEmployee, () => {
      view.viewEmployees();
    });
  }
}

module.exports = UserAddQuery;
