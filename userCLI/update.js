const inquirer = require("inquirer");
const UserViewQuery = require("./view.js");
const LogTable = require("./assets/logTable.js");
const tLog = new LogTable().log;

const connection = require("./assets/connection");

class UserUpdateQuery {
  async updateRole() {
    const employees = "SELECT * FROM employee";
    const roles = "SELECT * FROM role";
    const employeeData = await connection.query(employees);
    // console.log("\n================ EMPLOYEES ================");
    const employeeNames = employeeData.map(
      (row) => `${row.first_name} ${row.last_name}`
    );
    const eIDs = employeeData.map((row) => row.id);
    // tLog(employeeData);

    const roleData = await connection.query(roles);
    // console.log("\n================ ROLES ================");
    const rIDs = roleData.map((row) => row.id);
    const roleTitle = roleData.map((row) => row.title);
    // tLog(roleData);

    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "employeeName",
        message:
          "What is the id of the employee that you would like to update?",
        choices: employeeNames,
      },
      {
        type: "list",
        name: "newRole",
        message: "What is the id of the employee's new role'?",
        choices: roleTitle,
      },
    ]);
    const { employeeName, newRole } = runPrompt;
    const employeeID = eIDs[employeeNames.indexOf(employeeName)];
    const newRoleID = rIDs[roleTitle.indexOf(newRole)];
    const updateRoleID = `UPDATE employee SET role_id = ${newRoleID} WHERE id = ${employeeID}`;
    const viewUpdated =
      "SELECT e.id, e.first_name, e.last_name, r.title AS role, e.role_id FROM employee e JOIN role r ON e.role_id = r.id";

    const update = await connection.query(updateRoleID);
    const view = await connection.query(viewUpdated);

    console.log("\n================ EMPLOYEES ================");
    tLog(view);
  }
}

module.exports = UserUpdateQuery;
