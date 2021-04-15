const inquirer = require("inquirer");
const LogTable = require("./assets/logTable.js");
const tLog = new LogTable().log;

const connection = require("./assets/connection");

class UserViewQuery {
  async byDepartment() {
    const departments = "SELECT * FROM department";
    const deptData = await connection.query(departments);
    const deptList = deptData.map((row) => row.name);

    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "dept",
        message: "What department would you like to view?",
        choices: deptList,
      },
    ]);
    const { dept } = runPrompt;
    // view employee by department
    const deptEmployees = `SELECT e.id, e.first_name, e.last_name, r.title AS role, r.salary, d.name AS department FROM employee e JOIN role r	ON e.role_id = r.id JOIN department d	ON r.department_id = d.id	WHERE d.name = '${dept}'`;

    const viewEmployees = await connection.query(deptEmployees);

    console.log(
      "\n================ EMPLOYEES BY DEPARTMENT ================\n"
    );
    tLog(viewEmployees);
  }

  async employees() {
    const employees = "SELECT * FROM employee";
    const employeeData = await connection.query(employees);
    console.log("\n================ EMPLOYEES ================\n");
    tLog(employeeData);
  }

  async roles() {
    const roles = "SELECT * FROM role";
    const roleData = await connection.query(roles);
    console.log("\n================ ROLES ================\n");
    tLog(roleData);
  }

  async byManager() {
    const managers =
      "SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS dept FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id WHERE e.manager_id IS NULL";
    const managerData = await connection.query(managers);
    const managerIDs = managerData.map((row) => row.id);
    const managerName = managerData.map(
      (row) => `${row.first_name} ${row.last_name}`
    );
    console.log("\n================ MANAGERS ================\n");
    tLog(managerData);

    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "manager",
        message: "What manager's employess would you like to view?",
        choices: managerName,
      },
    ]);
    const { manager } = runPrompt;
    const selectedManager = managerIDs[managerName.indexOf(manager)];

    const employees = `SELECT e.id, e.first_name, e.last_name, r.title AS role, r.salary, d.name AS department FROM employee e JOIN role r	ON e.role_id = r.id JOIN department d ON r.department_id = d.id WHERE e.manager_id = ${selectedManager}`;
    console.log(employees);

    const employeeData = await connection.query(employees);

    employeeData === ""
      ? console.log("‼️ This manager does not have any employees yet! ‼️")
      : tLog(employeeData);
  }
}

module.exports = UserViewQuery;
