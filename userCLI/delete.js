// including npm inquirer package
const inquirer = require("inquirer");
// including UserViewQuery class constructor
const UserViewQuery = require("./view.js");
// new instance of UserViewQuery()
const view = new UserViewQuery();
// including connection requirements to connect to db
const connection = require("./assets/connection");

// constructor class to create 'delete' query methods
class UserDeleteQuery {
  // method to delete department
  async department() {
    // query to get department data
    const departments = "SELECT * FROM department";
    // connecting to db to get dept data
    const deptData = await connection.query(departments);
    // setting dept names into an array
    const deptNames = deptData.map((row) => row.name);
    // setting dept IDs into an array
    const deptIDs = deptData.map((row) => row.id);
    // waiting to run inquirer
    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "dept",
        message: "What department would you like to delete?",
        // passing through deptNames array as choices
        choices: deptNames,
      },
    ]);
    // declaring dept from runPrompt
    const { dept } = runPrompt;
    // determing the ID of the selected department
    const selectedID = deptIDs[deptNames.indexOf(dept)];
    // query to delete selected department and child data
    const deleteDept = `DELETE d.*, r.*, e.* FROM department d JOIN role r JOIN employee e WHERE (d.id = ${selectedID} AND r.department_id = ${selectedID}) AND (r.id = e.role_id)`;
    // connecting to db to delete department data
    const removeDept = await connection.query(deleteDept);
    // viewing updated table data
    const viewDepartment = await view.departments();
    const viewEmployees = await view.employees();
    const viewRoles = await view.roles();
  }
  // method to delete role data
  async role() {
    // query to get role data
    const roles = "SELECT * FROM role";
    // connecting to db to get role data
    const roleData = await connection.query(roles);
    // setting role titles into an array
    const roleTitle = roleData.map((row) => row.title);
    // setting role IDs into an array
    const roleIDs = roleData.map((row) => row.id);
    // waiting to run inquirer.prompt
    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "role",
        message: "What department would you like to delete?",
        // passing through roleTitle array as choices
        choices: roleTitle,
      },
    ]);
    // declaring role from runPrompt
    const { role } = runPrompt;
    // determining selectedRole id
    const selectedRole = roleIDs[roleTitle.indexOf(role)];
    // query to delete role data and child data from db
    const deleteRole = `DELETE r.*, e.* FROM role r JOIN employee e WHERE (r.id = ${selectedRole} AND e.role_id = ${selectedRole});`;
    // connecting to db to delete data
    const removeRole = await connection.query(deleteRole);
    // viewing updated table data
    const viewRoles = await view.roles();
    const viewEmployees = await view.employees();
  }
  // method to delete employee data from db
  async employee() {
    // query to get employee data
    const employees = "SELECT * FROM employee";
    // connecting to db to get employee data
    const employeeData = await connection.query(employees);
    // setting employee IDs into an array
    const employeeID = employeeData.map((row) => row.id);
    // setting employee names into an array
    const employeeNames = employeeData.map(
      (row) => `${row.first_name} ${row.last_name}`
    );
    // waiting to run inquirer.prompt
    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "employee",
        message: "What department would you like to delete?",
        // passing through employeeNames array as choices
        choices: employeeNames,
      },
    ]);
    // declaring employee from runPrompt
    const { employee } = runPrompt;
    // determing the id of the selected employee
    const selectedEmployeeID = employeeID[employeeNames.indexOf(employee)];
    // query to delete selected employee data
    const deleteEmployee = `DELETE e.* FROM employee e WHERE e.id = ${selectedEmployeeID};`;
    // query to update effected employees if a manager was removed
    const updateEmployees = `UPDATE employee SET manager_id = NULL WHERE manager_id = ${selectedEmployeeID}`;
    // connecting to db to delete employee
    const removeEmployee = await connection.query(deleteEmployee);
    // connecting to db to update any effected employees if a manager was deleted
    const update = await connection.query(updateEmployees);
    // viewing updated data
    const viewEmployees = await view.employees();
  }
}

// exporting UserDeleteQuery class
module.exports = UserDeleteQuery;
