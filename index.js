// grab modules
const inquirer = require('inquirer');
const cTable = require('console.table');
// grab database
const connection = require('./database/readData.js');
const server = require('./database/routes.js');

// start function
const start = () => {
  console.log("Welcome to the Company Employee Management System.");
  connection.connect((err) => {
    if (err) throw err;
    ask();
  });
}

// ask function that prompts for action to take and launches a follow up function based on the action chosen
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
          addEmployee();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Remove Employee':
          removeEmployee();
          break;
        case 'Remove Role':
          removeRole();
          break;
        case 'Remove Department':
          removeDepartment();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'Update Employee Manager':
          updateEmployeeManager();
          break;
        case 'EXIT':
          console.log('Exiting the program');
          connection.end();
          break;
      }
    })
}

// inquirer function for asking again to go back to ask
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

// view Employees function
const viewEmployees = () => {
  server.viewEmployees(askAgain);
}

// view roles function
const viewRoles = () => {
  server.viewRoles(askAgain);
}

// view departments function
const viewDepartments = () => {
  server.viewDepartments(askAgain);
}

// view employees by department function
const viewEmployeesbyDepartment = () => {
  server.getDepartments((data) => {
    var departments = [];
    var departmentNames = [];
    for (let department of data) {
      departments.push({ id: department.id, name: department.name });
      departmentNames.push(department.name);
    }
    inquirer
      .prompt({
        type: "list",
        message: "Which department would you like to view?",
        name: "department",
        choices: departmentNames
      })
      .then(({ department }) => {
        var index = departmentNames.indexOf(department);
        var id = departments[index].id;
        server.viewEmployeesbyDepartment(id, askAgain);
      })
  });
}

// view employees by manager function
const viewEmployeesbyManager = () => {
  server.getManagers((data) => {
    var managers = [];
    var managerNames = [];
    for (let manager of data) {
      managers.push({ id: manager.id, name: `${manager.first_name} ${manager.last_name}` });
      managerNames.push(`${manager.first_name} ${manager.last_name}`);
    }
    inquirer
      .prompt({
        type: "list",
        message: "Choose a manager to view his/her employees",
        name: "manager",
        choices: managerNames
      })
      .then(({ manager }) => {
        let index = managerNames.indexOf(manager);
        var id = managers[index].id;
        server.viewEmployeesbyManager(id, askAgain);
      })
  });
}

// add employee function
const addEmployee = () => {
  server.getRoles((data) => {
    var roles = [];
    var roleNames = [];
    for (let role of data) {
      roleNames.push(role.title);
      roles.push({ id: role.id, title: role.title });
    }
    server.getManagers((data) => {
      var managers = [];
      var managerNames = [];
      for (let manager of data) {
        managers.push({ id: manager.id, name: `${manager.first_name} ${manager.last_name}` });
        managerNames.push(`${manager.first_name} ${manager.last_name}`);
      }
      managerNames.push('This Employee has no manager');
      inquirer
        .prompt([
          {
            type: "input",
            message: "Enter the first name of the employee:",
            name: "first_name"
          },
          {
            type: "input",
            message: "Enter the last name of the employee:",
            name: "last_name"
          },
          {
            type: "list",
            message: "Select the employee's role",
            name: "role",
            choices: roleNames
          },
          {
            type: "list",
            message: "Select the employee's manager",
            name: "manager",
            choices: managerNames
          }
        ])
        .then((answers) => {
          var employee = {};
          employee.first_name = answers.first_name;
          employee.last_name = answers.last_name;
          let roleIndex = roleNames.indexOf(answers.role);
          employee.role_id = roles[roleIndex].id;
          if (answers.manager !== 'This Employee has no manager') {
            let index = managerNames.indexOf(answers.manager);
            employee.manager_id = managers[index].id;
          }
          server.addEmployee(employee, askAgain);
        });
    });
  });
}

// add role function
const addRole = () => {
  server.getDepartments((data) => {
    var departments = [];
    var departmentNames = [];
    for (let department of data) {
      departments.push({ id: department.id, name: department.name });
      departmentNames.push(department.name);
    }
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is this role's title?",
          name: "title"
        },
        {
          type: "input",
          message: "What is this role's yearly salary?",
          name: "salary"
        },
        {
          type: "list",
          message: "Select which department this role is in",
          name: "department",
          choices: departmentNames
        }
      ])
      .then((answers) => {
        var role = {};
        role.title = answers.title;
        role.salary = answers.salary;
        var index = departmentNames.indexOf(answers.department);
        role.department_id = departments[index].id;
        server.addRole(role, askAgain);
      })
  });
}

// add department function
const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department?",
      name: "name"
    })
    .then((answer) => {
      server.addDepartment(answer, askAgain);
    });
}

// remove employee function
const removeEmployee = () => {
  server.getEmployees((data) => {
    var employees = [];
    var employeeNames = [];
    for (let employee of data) {
      employees.push({ id: employee.id, name: `${employee.first_name} ${employee.last_name}` });
      employeeNames.push(`${employee.first_name} ${employee.last_name}`);
    }
    inquirer
      .prompt({
        type: "list",
        message: "Select the employee to remove",
        name: "employee",
        choices: employeeNames
      })
      .then(({ employee }) => {
        var index = employeeNames.indexOf(employee);
        var id = employees[index].id;
        server.deleteEmployee(id, askAgain);
      });
  });
}

// remove role function
const removeRole = () => {
  server.getRoles((data) => {
    var roles = [];
    var roleNames = [];
    for (let role of data) {
      roles.push({ id: role.id, title: role.title });
      roleNames.push(role.title);
    }
    inquirer
      .prompt({
        type: "list",
        message: "Select the role to remove",
        name: "role",
        choices: roleNames
      })
      .then(({ role }) => {
        var index = roleNames.indexOf(role);
        var id = roles[index].id;
        server.deleteRole(id, askAgain);
      })
  });
}

const removeDepartment = () => {
  server.getDepartments((data) => {
    var departments = [];
    var departmentNames = [];
    for (let department of data) {
      departments.push({ id: department.id, name: department.name });
      departmentNames.push(department.name);
    }
    inquirer
      .prompt({
        type: "list",
        message: "Select which department to delete",
        name: "department",
        choices: departmentNames
      })
      .then(({ department }) => {
        var index = departmentNames.indexOf(department);
        var id = departments[index].id;
        server.deleteDepartment(id, askAgain);
      });
  })
}

const updateEmployeeRole = () => {
  server.getEmployees((data) => {
    var employees = [];
    var employeeNames = [];
    for (let employee of data) {
      employees.push({ id: employee.id, name: `${employee.first_name} ${employee.last_name}` });
      employeeNames.push(`${employee.first_name} ${employee.last_name}`);
    }
    server.getRoles((data) => {
      var roles = [];
      var roleNames = [];
      for (let role of data) {
        roleNames.push(role.title);
        roles.push({ id: role.id, title: role.title });
      }
      inquirer
        .prompt([
          {
            type: "list",
            message: "Select the employee to modify",
            name: "employee",
            choices: employeeNames
          },
          {
            type: "list",
            message: "Select the new role to change to",
            name: "role",
            choices: roleNames
          }
        ])
        .then((answers) => {
          var employeeIndex = employeeNames.indexOf(answers.employee);
          var eid = employees[employeeIndex].id;
          var roleIndex = roleNames.indexOf(answers.role);
          var rid = roles[roleIndex].id;
          server.updateEmployeeRole(eid, rid, askAgain);
        });
    });
  });
}

const updateEmployeeManager = () => {
  server.getEmployees((data) => {
    var employees = [];
    var employeeNames = [];
    for (let employee of data) {
      employees.push({ id: employee.id, name: `${employee.first_name} ${employee.last_name}` });
      employeeNames.push(`${employee.first_name} ${employee.last_name}`);
    }
    server.getManagers((data) => {
      var managers = [];
      var managerNames = [];
      for (let manager of data) {
        managers.push({ id: manager.id, name: `${manager.first_name} ${manager.last_name}` });
        managerNames.push(`${manager.first_name} ${manager.last_name}`);
      }
      inquirer
        .prompt([
          {
            type: "list",
            message: "Select the employee to modify",
            name: "employee",
            choices: employeeNames
          },
          {
            type: "list",
            message: "Select the new manager to change to",
            name: "manager",
            choices: managerNames
          }
        ])
        .then((answers) => {
          var employeeIndex = employeeNames.indexOf(answers.employee);
          var eid = employees[employeeIndex].id;
          var managerIndex = managerNames.indexOf(answers.manager);
          var mid = managers[managerIndex].id;
          server.updateEmployeeManager(eid, mid, askAgain);
        });
    });
  });
}
// initialize app
start();