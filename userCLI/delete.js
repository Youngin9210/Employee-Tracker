const inquirer = require("inquirer");
const UserViewQuery = require("./view.js");
const view = new UserViewQuery();
const connection = require("./assets/connection");

class UserDeleteQuery {
  async department() {
    const departments = "SELECT * FROM department";
    const deptData = await connection.query(departments);
    const deptNames = deptData.map((row) => row.name);
    const deptIDs = deptData.map((row) => row.id);

    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "dept",
        message: "What department would you like to delete?",
        choices: deptNames,
      },
    ]);

    const { dept } = runPrompt;
    const selectedID = deptIDs[deptNames.indexOf(dept)];
    const deleteDept = `DELETE d.*, r.*, e.* FROM department d JOIN role r JOIN employee e WHERE (d.id = ${selectedID} AND r.department_id = ${selectedID}) AND (r.id = e.role_id)`;
    const removeDept = await connection.query(deleteDept, () => {
      view.departments();
      view.roles();
      view.employees();
    });
  }
}

module.exports = UserDeleteQuery;
