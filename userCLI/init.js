const inquirer = require("inquirer");
const UserViewQuery = require("./view.js");
const view = new UserViewQuery();
const UserAddQuery = require("./userCLI/add.js");
const add = new UserAddQuery();

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
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles",
            "Add Role",
            "Remove Role",
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
        }
      });
  }
}

module.exports = initApp;
