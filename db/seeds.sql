USE employeeTracker_DB;

INSERT INTO department (name)
VALUES 
	('Sales'),
	('Engineering'),
	('Finance'),
	('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
	('Sales Lead', 100000, 1),
	('Salesperson', 60000, 1),
	('Lead Engineer', 150000, 2),
	('Software Engineer', 120000, 2),
	('Accountant', 125000, 3),
	('Budget Analyst', 90000, 3),
	('Legal Team Lead', 250000, 4),
	('Lawyer', 165000, 4);
	
	INSERT INTO employee (first_name, last_name, role_id, manager_id)
	VALUES
		('Kyle', 'Young', 3, null),
		('Kylie', 'Young', 1, null),
		('Zoe', 'Jean', 2, 2),
		('Cali', 'Rose', 4, 1),
		('Brian', 'Gelhaus', 4, 1),
		('Chance', 'Ory', 7, null),
		('John', 'Doe', 8, 6),
		('Maverick', 'Mitchell', 5, null),
		('Goose', 'Bradshaw', 6, 8);
		
		SELECT * FROM department;
		SELECT * FROM role;
		SELECT * FROM employee;
