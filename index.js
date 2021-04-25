// grab modules
const inquirer = require('inquirer');
const cTable = require('console.table');
// grab database
const connection = require('./database/readData.js');
const server = require('./database/routes.js');

const start = () => {
  console.log("Welcome to the Company Employee Management System.");
  connection.connect((err) => {
    if (err) throw err;
    ask();
  });
}

const ask = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: ['View All Employees', 'View All Roles', 'View All Departments', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Add Role', 'Add Department', 'Remove Employee', 'Remove Role', 'Remove Department', 'Update Employee Role', 'Update Employee Manager', 'EXIT']
    })
    .then(({ choice }) => {
      switch (choice) {
        case 'View All Employees':
          viewEmployees();
          break;
        case 'View All Roles':
          viewRoles();
          break;
        case 'View All Departments':
          viewDepartments();
          break;
        case 'View All Employees By Department':
          viewEmployeesbyDepartment();
          break;
        case 'View All Employees By Manager':
          viewEmployeesbyManager();
          break;
        case 'Add Employee':
          break;
        case 'Add Role':
          break;
        case 'Add Department':
          break;
        case 'Remove Employee':
          break;
        case 'Remove Role':
          break;
        case 'Remove Department':
          break;
        case 'Update Employee Role':
          break;
        case 'Update Employee Manager':
          break;
        case 'EXIT':
          console.log('Exiting the program');
          connection.end();
          break;
      }
    })
}

const askAgain = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Would you like to make another query?",
      name: "choice",
      choices: ['yes', 'no']
    })
    .then(({ choice }) => {
      switch (choice) {
        case 'yes':
          ask();
          break;
        case 'no':
          console.log('Exiting the program');
          connection.end();
          break;
      }
    });
}

const viewEmployees = () => {
  server.viewEmployees(askAgain);
}

const viewRoles = () => {
  server.viewRoles(askAgain);
}

const viewDepartments = () => {
  server.viewDepartments(askAgain);
}

const viewEmployeesbyDepartment = () => {
  server.getDepartments((data) => {
    var departments = [];
    for (let department of data) {
      departments.push(department.name);
    }
    inquirer
      .prompt({
        type: "list",
        message: "Which department would you like to view?",
        name: "department",
        choices: departments
      })
      .then(({department}) => {
        var id = departments.indexOf(department) + 1;
        server.viewEmployeesbyDepartment(id, askAgain);
      })
  });
}

const viewEmployeesbyManager = () => {
  server.getManagers((data) => {
    var managers = [];
    var managerNames = [];
    for (let manager of data) {
      managers.push({id: manager.id, name: `${manager.first_name} ${manager.last_name}`});
      managerNames.push(`${manager.first_name} ${manager.last_name}`);
    }
    inquirer
      .prompt({
        type: "list",
        message: "Choose a manager to view his/her employees",
        name: "manager",
        choices: managerNames
      })
      .then(({manager}) => {
        let index = managerNames.indexOf(manager);
        var id = managers[index].id;
        server.viewEmployeesbyManager(id, askAgain);
      })
  });
}

start();