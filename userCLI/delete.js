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

  async role() {
    const roles = "SELECT * FROM role";
    const roleData = await connection.query(roles);
    const roleTitle = roleData.map((row) => row.title);
    const roleIDs = roleData.map((row) => row.id);

    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "role",
        message: "What department would you like to delete?",
        choices: roleTitle,
      },
    ]);

    const { role } = runPrompt;
    const selectedRole = roleIDs[roleTitle.indexOf(role)];
    const deleteRole = `DELETE r.*, e.* FROM role r JOIN employee e WHERE (r.id = ${selectedRole} AND e.role_id = ${selectedRole});`;
    const removeRole = await connection.query(deleteRole, () => {
      view.roles();
      view.employees();
    });
  }
}

module.exports = UserDeleteQuery;
