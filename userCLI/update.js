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
    console.log("\n================ EMPLOYEES ================");
    tLog(employeeData);

    const eIDs = employeeData.map((row) => row.id);
    const roleData = await connection.query(roles);
    console.log("\n================ ROLES ================");
    const rIDs = roleData.map((row) => row.id);
    tLog(roleData);

    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "employeeID",
        message:
          "What is the id of the employee that you would like to update?",
        choices: eIDs,
      },
      {
        type: "list",
        name: "roleID",
        message: "What is the id of the employee's new role'?",
        choices: rIDs,
      },
    ]);
    const { employeeID, roleID } = runPrompt;
    let updateRoleID = `UPDATE employee SET role_id = ${roleID} WHERE id = ${employeeID}`;

    const update = await connection.query(updateRoleID, () => {
      new UserViewQuery().viewEmployees();
    });
    console.log(update);

    // connection.query(updateRoleID, (err, res) => {
    //   new UserViewQuery().viewEmployees();
    // });
  }
}

module.exports = UserUpdateQuery;
