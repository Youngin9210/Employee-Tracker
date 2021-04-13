const inquirer = require("inquirer");
const UserViewQuery = require("./view.js");
const view = new UserViewQuery();
const UserAddQuery = require("./add.js");
const add = new UserAddQuery();
const UserUpdateQuery = require("./update.js");
const update = new UserUpdateQuery();

class initApp {
  init() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "init",
          message: "What would you like to do?",
          choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "View All Roles",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Remove Employee",
          ],
        },
      ])
      .then((answer) => {
        const { init } = answer;
        switch (init) {
          case "View All Employees":
            view.viewEmployees();
            break;
          case "View All Employees By Department":
            view.viewDepartment();
            break;
          case "View All Employees By Manager":
            view.viewManager();
            break;
          case "View All Roles":
            view.viewRoles();
            break;
          case "Add Department":
            add.addDepartment();
            break;
          case "Add Role":
            add.addRole();
            break;
          case "Add Employee":
            add.addEmployee();
            break;
          case "Update Employee Role":
            add.addEmployee();
            break;
        }
      });
  }

  answers() {}
}

module.exports = initApp;
