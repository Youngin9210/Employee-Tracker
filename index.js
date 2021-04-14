const inquirer = require("inquirer");

const initApp = require("./userCLI/init.js");
const app = new initApp();

app.prompt();
