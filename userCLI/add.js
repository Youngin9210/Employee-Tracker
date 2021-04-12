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
        const { newDepartment } = data;
        console.log(newDepartment);
      });
  }

  addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "newRole",
          message: "What role would you like to add?",
          validate: (newRole) => {
            return newRole ? true : console.log("Please input a new role.");
          },
        },
      ])
      .then((data) => {
        const { newRole } = data;
        console.log(newRole);
      });
  }
}

module.exports = UserAddQuery;
