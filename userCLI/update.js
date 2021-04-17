// including npm inquirer package
const inquirer = require("inquirer");
// including npm console.table package
const LogTable = require("./assets/logTable.js");
// new instance of LogTable().log
const tLog = new LogTable().log;
// including connection requirements to connect to db
const connection = require("./assets/connection");

// constructor class to create 'update' query methods
class UserUpdateQuery {
  // method to update role a specific employee's role
  async employeeRole() {
    // query to select employee data
    const employees = "SELECT * FROM employee";
    // query to select role data
    const roles = "SELECT * FROM role";
    // connecting to db to get employee data
    const employeeData = await connection.query(employees);
    // setting employee full names into an array
    const employeeNames = employeeData.map(
      (row) => `${row.first_name} ${row.last_name}`
    );
    // setting the employee IDs into an array
    const eIDs = employeeData.map((row) => row.id);
    // connecting to db to get role data
    const roleData = await connection.query(roles);
    // setting role IDs into an array
    const rIDs = roleData.map((row) => row.id);
    // setting role titles into an array
    const roleTitle = roleData.map((row) => row.title);
    // waiting to run inquirer.prompt to determine what employee to update and the new role of the employee
    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "employeeName",
        message: "What employee you would like to update?",
        // passing through employeeNames array as choices
        choices: employeeNames,
      },
      {
        type: "list",
        name: "newRole",
        message: "What is the employee's new role'?",
        // passing through roleTitle array as choices
        choices: roleTitle,
      },
    ]);
    // declaring employeeName and newRole from runPrompt
    const { employeeName, newRole } = runPrompt;
    // determining the ID of the selected employee
    const employeeID = eIDs[employeeNames.indexOf(employeeName)];
    // determing the new role ID
    const newRoleID = rIDs[roleTitle.indexOf(newRole)];
    // query to update employee role
    const updateRoleID = `UPDATE employee SET role_id = ${newRoleID} WHERE id = ${employeeID}`;
    // query to view the updated employee table data
    const viewUpdated =
      "SELECT e.id, e.first_name, e.last_name, r.title AS role, e.role_id FROM employee e JOIN role r ON e.role_id = r.id";
    // connecting to db to update employee data
    const update = await connection.query(updateRoleID);
    // connecting to db to view the updated employee data
    const view = await connection.query(viewUpdated);

    console.log("\n================ EMPLOYEES ================\n");
    // console.table logging updated employee data
    tLog(view);
  }
}

// exporting UserUpdateQuery class
module.exports = UserUpdateQuery;
