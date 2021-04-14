const inquirer = require("inquirer");
const figlet = require("figlet");

const UserViewQuery = require("./view.js");
const view = new UserViewQuery();

const UserAddQuery = require("./add.js");
const add = new UserAddQuery();

const UserUpdateQuery = require("./update.js");
const update = new UserUpdateQuery();

class initApp {
  init() {
    figlet("Employee", async (err, data) => {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);

      figlet("Manager", async (err, data) => {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(data);
      });
    });
    this.prompt();
  }

  async prompt() {
    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "toDo",
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
    ]);
    const { toDo } = runPrompt;
    switch (toDo) {
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
        update.updateRole();
        break;
    }
  }
}

module.exports = initApp;
