// grab modules
const inquirer = require('inquirer');
const cTable = require('console.table');
// grab database
const connection = require('../database/readData.js');
const server = require('../database/routes.js');

class Company {
  constructor() {
    this.entry;
  }
  start() {
    console.log("Welcome to the Company Employee Management System.");
    connection.connect((err) => {
      if (err) throw err;
      this.ask();
    });
  }
  ask() {
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
            this.viewEmployees();
            break;
          case 'View All Roles':
            this.viewRoles();
            break;
          case 'View All Departments':
            this.viewDepartments();
            break;
          case 'View All Employees By Department':
            this.viewEmployeesbyDepartment();
            break;
          case 'View All Employees By Manager':
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

  askAgain() {
    inquirer
      .prompt({
        type: "list",
        message: "Would you like to make another query?",
        name: "choice",
        choices: ['yes', 'no']
      })
      .then(({ choice }) => {
        if (choice === 'yes') {
          this.ask();
        } else {
          console.log('Exiting the program');
          connection.end();
        }
      });
  }

  viewEmployees() {
    server.viewEmployees(this.askAgain);
  }

  viewRoles() {
    server.viewRoles(this.askAgain);
  }

  viewDepartments() {
    server.viewDepartments(this.askAgain);
  }

  viewEmployeesbyDepartment() {
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
          server.viewEmployeesbyDepartment(id, this.askAgain);
        })
    });
  }
}

module.exports = Company;