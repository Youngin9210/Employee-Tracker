const inquirer = require('inquirer');
const figlet = require('figlet');
const connection = require('./assets/connection');

const UserViewQuery = require('./view.js');
const view = new UserViewQuery();

const UserAddQuery = require('./add.js');
const add = new UserAddQuery();

const UserUpdateQuery = require('./update.js');
const update = new UserUpdateQuery();

const UserDeleteQuery = require('./delete.js');
const remove = new UserDeleteQuery();

class initApp {
	async init() {
		figlet('Employee\nManager', async (err, data) => {
			if (err) {
				console.log('Something went wrong...');
				console.dir(err);
				return;
			}
			console.log(data);
			await this.prompt();
		});
	}

	async prompt() {
		const runPrompt = await inquirer.prompt([
			{
				type: 'list',
				name: 'toDo',
				message: 'What would you like to do?',
				choices: [
					'View All Employees',
					'View All Employees By Department',
					'View All Employees By Manager',
					'View All Roles',
					'View Department Budgets',
					'Add Department',
					'Add Role',
					'Add Employee',
					'Update Employee Role',
					'Update Employee Manager',
					'Remove Department',
					'Remove Role',
					'Remove Employee',
					'Exit',
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
			case 'View All Employees':
				const employees = await view.employees();
				prompt();
				break;
			case 'View All Employees By Department':
				const byDept = await view.byDepartment();
				prompt();
				break;
			case 'View All Employees By Manager':
				const byManager = await view.byManager();
				prompt();
				break;
			case 'View Department Budgets':
				const deptBudget = await view.deptBudget();
				prompt();
				break;
			case 'View All Roles':
				const roles = await view.roles();
				prompt();
				break;
			case 'Add Department':
				const addDept = await add.department();
				prompt();
				break;
			case 'Add Role':
				const addRole = await add.role();
				prompt();
				break;
			case 'Add Employee':
				const addEmployee = await add.employee();
				prompt();
				break;
			case 'Update Employee Role':
				const updateRole = await update.role();
				prompt();
				break;
			case 'Remove Department':
				const removeDept = await remove.department();
				prompt();
				break;
			case 'Remove Role':
				const removeRole = await remove.role();
				prompt();
				break;
			case 'Remove Employee':
				const removeEmployee = await remove.employee();
				prompt();
				break;
			default:
				connection.end();
		}
	}
}

module.exports = initApp;
