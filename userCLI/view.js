const inquirer = require("inquirer");
const LogTable = require("./assets/logTable.js");
const tLog = new LogTable().log;

const connection = require("./assets/connection");

class UserViewQuery {
  async viewByDepartment() {
    const departments = "SELECT * FROM department";
    const deptData = await connection.query(departments);
    const deptList = deptData.map((row) => row.id);
    tLog(deptData);

    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "dept",
        message: "What department would you like to view? (Reference above)",
        choices: deptList,
      },
    ]);
    const { dept } = runPrompt;
    // view employee by department
    let deptEmployees = `SELECT e.id, e.first_name, e.last_name, r.title AS role, r.salary, d.name AS department FROM employee e JOIN role r	ON e.role_id = r.id JOIN department d	ON r.department_id = d.id	WHERE d.id = ${dept}`;

    const viewEmployees = await connection.query(deptEmployees);

    console.log("\n================ EMPLOYEES BY DEPARTMENT ================");
    tLog(viewEmployees);
  }

  async viewEmployees() {
    const employees = "SELECT * FROM employee";
    const employeeData = await connection.query(employees);
    console.log("\n================ EMPLOYEES ================");
    tLog(employeeData);
  }

  async viewRoles() {
    const roles = "SELECT * FROM role";
    const roleData = await connection.query(roles);
    console.log("\n================ ROLES ================");
    tLog(roleData);
  }

  async viewByManager() {
    const managers =
      "SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS dept FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id WHERE e.manager_id IS NULL";
    const managerData = await connection.query(managers);
    const managerList = managerData.map((row) => row.id);
    console.log("\n================ MANAGERS ================");
    tLog(managerData);

    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "manager",
        message:
          "What is the ID of the manager you like to view? (Reference above)",
        choices: managerList,
      },
    ]);
    const { manager } = runPrompt;

    const employees = `SELECT e.id, e.first_name, e.last_name, r.title AS role, r.salary, d.name AS department FROM employee e JOIN role r	ON e.role_id = r.id JOIN department d ON r.department_id = d.id WHERE e.manager_id = ${manager}`;

    const employeeData = await connection.query(employees);

    employeeData === ""
      ? tLog(employeeData)
      : console.log("‼️ This manager does not have any employees yet! ‼️");
  }
}

module.exports = UserViewQuery;
