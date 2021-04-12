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

  addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "newFirst",
          message: "What is the first name of the new employee?",
          validate: (newFirst) => {
            return newFirst
              ? true
              : console.log("Please input the first name of the new employee.");
          },
        },
        {
          type: "input",
          name: "newLast",
          message: "What is the first name of the new employee?",
          validate: (newLast) => {
            return newLast
              ? true
              : console.log("Please input the first name of the new employee.");
          },
        },
      ])
      .then((data) => {
        const { newFirst, newLast } = data;
        console.log(newFirst, newLast);
      });
  }
}

module.exports = UserAddQuery;
