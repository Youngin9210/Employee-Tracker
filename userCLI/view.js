const inquirer = require("inquirer");
const LogTable = require("./assets/logTable.js");
const tLog = new LogTable().log;

const connection = require("./assets/connection");

class UserViewQuery {
  async departments() {
    const departments = "SELECT * FROM department";
    const deptData = await connection.query(departments);
    console.log("\n================ DEPARTMENTS ================\n");
    tLog(deptData);
  }

  async employees() {
    const employees =
      "SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id LEFT JOIN employee manager ON manager.id = e.manager_id";
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

  async deptBudget() {
    const budgets =
      "SELECT d.name as Department, sum(r.salary) as Budget FROM role r JOIN department d ON d.id = r.department_id GROUP BY department_id";
    const budgetData = await connection.query(budgets);

    console.log("\n================ DEPARTMENT BUDGETS ================\n");
    tLog(budgetData);
  }
}

module.exports = UserViewQuery;
