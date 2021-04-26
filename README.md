# 12-employee-management-system
This assignment was assigned by the U.C. Berkeley Extension Full-time Full Stack Flex Boot Camp.
This is assignment 12 for the program. In this assignment I was tasked to architect and build a solution for managing a company's employees using node, inquirer, and MySQL. The result is a command line application that manages the process.

It contains notable features such as:
- A backend database hosted by mySQL
  - 3 tables of data
    - Department
      - id
      - name
    - Role
      - id
      - title
      - salary
      - department id (taken from the department table)
    - Employee
      - id
      - first name
      - last name
      - role id (taken from the Role table)
      - manager id (taken from the employee table)
- A series of user input prompts that allows users to perform a multitude of data manipulations.
  - Add departments, roles, and employees
  - View departments, roles, and employees
  - Update employee roles

Due: Monday, April 26, 2021 11:59 PM
```js
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
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Node.js is required.

### Installing
To install the necessary dependencies, run the npm installation command
```
npm install
```

### Testing
There are no tests in this application.

### Usage
You can run the program on the command line with the following command:
```
npm start
```

## Video Demo
* [Video Demo Here](https://youtu.be/4TaXQXvfCSk)

## Built With

* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Node.js](https://nodejs.org/en/docs/)
* [mySQL](https://dev.mysql.com/doc/)

## Authors
AcedYu
- [Link to Github](https://github.com/AcedYu)
- [Link to LinkedIn](https://www.linkedin.com/in/alex-yu-3712811b9/)