// grab modules
const inquirer = require('inquirer');
const cTable = require('console.table');
// grab database
const connection = require('../database/readData.js');

class Company {
  constructor() {
    this.entry;
  }
  start() {
    console.log("Welcome to the Company Employee Management System.");
    this.ask();
  }
  ask() {
    return inquirer
      .prompt({
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'EXIT']
      })
      .then(({ choice }) => {
        switch(choice) {
          case 'View All Employees':
            break;
          case 'View All Employees By Department':
            break;
          case 'View All Employees By Manager':
            break;
          case 'Add Employee':
            break;
          case 'Remove Employee':
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
}

module.exports = Company;