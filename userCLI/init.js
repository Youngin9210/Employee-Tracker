// including npm package inquirer
const inquirer = require("inquirer");

// including npm package figlet for cli text art
const figlet = require("figlet");

// including connection requirements to connect to db
const connection = require("./assets/connection");

// requiring query classes
// creating new instances of query class
const UserViewQuery = require("./view.js");
const view = new UserViewQuery();

const UserAddQuery = require("./add.js");
const add = new UserAddQuery();

const UserUpdateQuery = require("./update.js");
const update = new UserUpdateQuery();

const UserDeleteQuery = require("./delete.js");
const remove = new UserDeleteQuery();

// constructor class to initialize app
class initApp {
  async init() {
    // prompt the command line with figlet cli text art
    figlet("Employee\nManager", async (err, data) => {
      if (err) {
        // if err log err
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      // else, log data
      console.log(data);
      // then call prompt() method
      await this.prompt();
    });
  }

  async prompt() {
    // runPrompt waiting to call inquirer.prompt
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
          "View Department Budgets",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Remove Department",
          "Remove Role",
          "Remove Employee",
          "Exit",
        ],
      },
    ]);
    // waiting to call answerPrompt().answer
    const answer = await new AnswerPrompt().answer;
    answer(runPrompt.toDo);
  }
}

class AnswerPrompt {
  // switch statement to determine what constructor method to call next, then prompt again
  async answer(x) {
    const prompt = await new initApp().prompt;
    switch (x) {
      case "View All Employees":
        const employees = await view.employees();
        prompt();
        break;
      case "View All Employees By Department":
        const byDept = await view.byDepartment();
        prompt();
        break;
      case "View All Employees By Manager":
        const byManager = await view.byManager();
        prompt();
        break;
      case "View Department Budgets":
        const deptBudget = await view.deptBudget();
        prompt();
        break;
      case "View All Roles":
        const roles = await view.roles();
        prompt();
        break;
      case "Add Department":
        const addDept = await add.department();
        prompt();
        break;
      case "Add Role":
        const addRole = await add.role();
        prompt();
        break;
      case "Add Employee":
        const addEmployee = await add.employee();
        prompt();
        break;
      case "Update Employee Role":
        const updateRole = await update.employeeRole();
        prompt();
        break;
      case "Remove Department":
        const removeDept = await remove.department();
        prompt();
        break;
      case "Remove Role":
        const removeRole = await remove.role();
        prompt();
        break;
      case "Remove Employee":
        const removeEmployee = await remove.employee();
        prompt();
        break;
      // exit to end connection
      default:
        connection.end();
    }
  }
}

// exporting initApp class
module.exports = initApp;
