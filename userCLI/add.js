const inquirer = require("inquirer");

class UserAddQuery {
  addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "newDepartment",
          message: "What department would you like to add?",
          validate: (newDepartment) => {
            return newDepartment
              ? true
              : console.log("Please input a new department.");
          },
        },
      ])
      .then((data) => {
        console.log(data.newDepartment);
      });
  }
}

module.exports = UserAddQuery;
