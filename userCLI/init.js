const inquirer = require("inquirer");
const figlet = require("figlet");
const connection = require("./assets/connection");

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
          "Exit",
        ],
      },
    ]);

    const answer = await new AnswerPrompt().answer;
    answer(runPrompt.toDo);
  }
}

class AnswerPrompt {
  async answer(x) {
    const prompt = await new initApp().prompt;
    switch (x) {
      case "View All Employees":
        const employees = await view.viewEmployees();
        prompt();
        break;
      case "View All Employees By Department":
        const byDept = await view.viewByDepartment();
        prompt();
        break;
      case "View All Employees By Manager":
        const byManager = await view.viewByManager();
        prompt();
        break;
      case "View All Roles":
        const roles = await view.viewRoles();
        prompt();
        break;
      case "Add Department":
        const addDept = await add.addDepartment();
        prompt();
        break;
      case "Add Role":
        const addRole = await add.addRole();
        prompt();
        break;
      case "Add Employee":
        const addEmployee = await add.addEmployee();
        prompt();
        break;
      case "Update Employee Role":
        const updateRole = await update.updateRole();
        prompt();
        break;
      default:
        connection.end();
    }
  }
}

module.exports = initApp;
