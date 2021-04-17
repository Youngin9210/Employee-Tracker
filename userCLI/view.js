// including npm package inquirer
const inquirer = require("inquirer");
// including LogTable class module
const LogTable = require("./assets/logTable.js");
// putting new LogTable().log instance into a variable
const tLog = new LogTable().log;
// including connection requirements to connect to db
const connection = require("./assets/connection");

// constructor class used to create 'view' query methods
class UserViewQuery {
  // method to view department table of employeeTracker_DB
  async departments() {
    // sql query set into a variable
    const departments = "SELECT * FROM department";
    // connecting to database to get all data from department table
    const deptData = await connection.query(departments);
    console.log("\n================ DEPARTMENTS ================\n");
    // logging department table using npm console.table package
    tLog(deptData);
  }

  // method to view employee table joined with role and department table
  async employees() {
    // selecting specific rows in employee, role, and department tables to get data from
    const employees =
      "SELECT e.id, e.first_name, e.last_name, r.title as role, d.name as department, r.salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id LEFT JOIN employee manager ON manager.id = e.manager_id";
    // connecting to database to get employee data
    const employeeData = await connection.query(employees);
    console.log("\n================ EMPLOYEES ================\n");
    // logging custom employee table using npm console.table package
    tLog(employeeData);
  }

  // method to view roles table
  async roles() {
    // selecting all data from role table
    const roles = "SELECT * FROM role";
    // connecting to database to get role data
    const roleData = await connection.query(roles);
    console.log("\n================ ROLES ================\n");
    // logging role table using npm console.table package
    tLog(roleData);
  }

  // method to view employees by department
  async byDepartment() {
    // selecting department data from database
    const departments = "SELECT * FROM department";
    // connecting to database to get department data
    const deptData = await connection.query(departments);
    // setting dept names into an array
    const deptList = deptData.map((row) => row.name);

    // inquirer prompt to determin what dept to view
    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "dept",
        message: "What department would you like to view?",
        // passing through deptList as choices
        choices: deptList,
      },
    ]);
    // declaring dept from runPrompt
    const { dept } = runPrompt;
    // view employee by department
    const deptEmployees = `SELECT e.id, e.first_name, e.last_name, r.title AS role, r.salary, d.name AS department FROM employee e JOIN role r	ON e.role_id = r.id JOIN department d	ON r.department_id = d.id	WHERE d.name = '${dept}'`;

    // connecting to database to get employee by department data
    const viewEmployees = await connection.query(deptEmployees);

    console.log(
      `\n================ EMPLOYEES BY DEPARTMENT (${dept}) ================\n`
    );
    // logging employees by department table
    tLog(viewEmployees);
  }

  // method to view employees by manager
  async byManager() {
    // selecting managers from database
    const managers =
      "SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS dept FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id WHERE e.manager_id IS NULL";
    // connecting to database to get manager data
    const managerData = await connection.query(managers);
    // setting manager IDs into and array
    const managerIDs = managerData.map((row) => row.id);
    // setting manager full names and departments into an array
    const managerName = managerData.map(
      (row) => `${row.first_name} ${row.last_name} (${row.dept})`
    );
    // waiting to run inquirer prompt to determine what manager to view
    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "manager",
        message: "What manager's employees would you like to view?",
        // passing through managerName array as choices
        choices: managerName,
      },
    ]);
    // declaring manager from runPrompt
    const { manager } = runPrompt;
    // determining the id of the selected manager
    const selectedManager = managerIDs[managerName.indexOf(manager)];
    // query used to select employees to view depending on selectedManager
    const employees = `SELECT e.id, e.first_name, e.last_name, r.title AS role, r.salary, d.name AS department FROM employee e JOIN role r	ON e.role_id = r.id JOIN department d ON r.department_id = d.id WHERE e.manager_id = ${selectedManager}`;

    // connecting to database to get table data
    const employeeData = await connection.query(employees);

    console.log(
      `\n================ EMPLOYEES BY MANAGER (${manager}) ================\n`
    );
    employeeData === ""
      ? // if employeeData is an empty string, then log no employees for this manager
        console.log("‼️ This manager does not have any employees yet! ‼️")
      : // else, log employees by manager table
        tLog(employeeData);
  }

  // method to view department budgets
  async deptBudget() {
    // selecting data to get department budgets
    const budgets =
      "SELECT d.name as Department, sum(r.salary) as Budget FROM role r JOIN department d ON d.id = r.department_id GROUP BY department_id";
    // connecting to database to get table data
    const budgetData = await connection.query(budgets);

    console.log("\n================ DEPARTMENT BUDGETS ================\n");
    // logging budgetData table
    tLog(budgetData);
  }
}

// exporting UserViewQuery class
module.exports = UserViewQuery;
