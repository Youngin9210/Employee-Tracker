const inquirer = require("inquirer");
var figlet = require("figlet");

const initApp = require("./userCLI/init.js");
const app = new initApp();

figlet("Employee", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);

  figlet("Manager", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
});

app.init();
