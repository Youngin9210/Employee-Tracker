const inquirer = require("inquirer");
const UserViewQuery = require("./view.js");
const view = new UserViewQuery();

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
          case "View All Employees By Department":
            view.viewDepartment();
        }
      });
  }
}

module.exports = initApp;
