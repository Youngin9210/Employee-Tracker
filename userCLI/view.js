const inquirer = require("inquirer");
const LogTable = require("./assets/logTable.js");
const tLog = new LogTable().log;

const connection = require("./assets/connection");

class UserViewQuery {
  async viewDepartment() {
    const departments = "SELECT * FROM department";
    const deptData = await connection.query(departments);
    const deptList = deptData.map((row) => row.id);
    tLog(deptData);

    const runPrompt = await inquirer.prompt([
      {
        type: "list",
        name: "dept",
        message: "What department would you like to view? (Reference above)",
        choices: deptList,
      },
    ]);
    const { dept } = runPrompt;
    // view employee by department
    let deptEmployees = `SELECT e.id, e.first_name, e.last_name, r.title AS role, r.salary, d.name AS department FROM employee e JOIN role r	ON e.role_id = r.id JOIN department d	ON r.department_id = d.id	WHERE d.id = ${dept}`;

    const viewEmployees = await connection.query(deptEmployees);

    console.log("\n================ EMPLOYEES BY DEPARTMENT ================");
    tLog(viewEmployees);
  }

  viewEmployees() {
    let employees = "SELECT * FROM employee";
    connection.query(employees, (err, res) => {
      console.log("\n================ EMPLOYEES ================");
      tLog(res);
    });
  }

  viewRoles() {
    let roles = "SELECT * FROM role";
    connection.query(roles, (err, res) => {
      console.log("\n================ Roles ================");
      tLog(res);
    });
  }

  viewManager() {
    let managers =
      "SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS dept FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id WHERE e.manager_id IS NULL";
    let managerList = [];
    connection.query(managers, (err, res) => {
      res.forEach(({ id }, i) => {
        managerList.push(id);
        i++;
      });

      console.log("\n================ MANAGERS ================");
      tLog(res);
      inquirer
        .prompt([
          {
            type: "list",
            name: "manager",
            message:
              "What is the ID of the manager you like to view? (Reference above)",
            choices: managerList,
          },
        ])
        .then((answer) => {
          const { manager } = answer;

          let employees = `SELECT e.id, e.first_name, e.last_name, r.title AS role, r.salary, d.name AS department FROM employee e JOIN role r	ON e.role_id = r.id JOIN department d ON r.department_id = d.id WHERE e.manager_id = ${manager}`;
          connection.query(employees, (err, res) => {
            console.log(
              "\n================ EMPLOYEES BY MANAGER ================"
            );
            tLog(res);
          });
        });
    });
  }
}

module.exports = UserViewQuery;
