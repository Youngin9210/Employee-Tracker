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
    const removeDept = await connection.query(deleteDept);
    const viewDepartment = await view.departments();
    const viewEmployees = await view.employees();
    const viewRoles = await view.roles();
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
    const removeRole = await connection.query(deleteRole);
    const viewRoles = await view.roles();
    const viewEmployees = await view.employees();
  }

  async employee() {
    const employees = "SELECT * FROM employee";
    const employeeData = await connection.query(employees);
    const employeeID = employeeData.map((row) => row.id);
    const employeeNames = employeeData.map(
      (row) => `${row.first_name} ${row.last_name}`
    );

    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "employee",
        message: "What department would you like to delete?",
        choices: employeeNames,
      },
    ]);

    const { employee } = runPrompt;
    const selectedEmployeeID = employeeID[employeeNames.indexOf(employee)];
    const deleteEmployee = `DELETE e.* FROM employee e WHERE e.id = ${selectedEmployeeID};`;
    const updateEmployees = `UPDATE employee SET manager_id = NULL WHERE manager_id = ${selectedEmployeeID}`;

    const removeEmployee = await connection.query(deleteEmployee);
    const update = await connection.query(updateEmployees);

    const viewEmployees = await view.employees();
  }
}

module.exports = UserDeleteQuery;
