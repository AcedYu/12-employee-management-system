const cTable = require('console.table');
const connection = require('./readData.js');

// View Functions
// view employees that accepts a callback function
const viewEmployees = (cb) => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
    cb();
  });
}

// view roles that accepts a callback function
const viewRoles = (cb) => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    cb();
  });
}

// view departments that accepts a callback function
const viewDepartments = (cb) => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    cb();
  });
}

// view Employees by department that accepts a callback function
const viewEmployeesbyDepartment = (departmentid, cb) => {
  connection.query(
    'SELECT * FROM employee WHERE role_id IN (SELECT id FROM role WHERE ?)',
    {
      department_id: departmentid,
    },
    (err, res) => {
    if (err) throw err;
    console.table(res);
    cb();
  });
}

// view employees by manager that accepts the manager id and a callback function
const viewEmployeesbyManager = (id, cb) => {
  connection.query(
    'SELECT * FROM employee WHERE ?',
    {
      manager_id: id,
    },
    (err, res) => {
      if(err) throw err;
      if (res.length === 0) {
        console.log("This manager currently has no one working under him/her.\n");
        cb();
      } else {
        console.table(res);
        cb();
      }
    });
}

// Get functions that return the response in the callback
// get Departments that returns the response to a callback function
const getDepartments = (cb) => {
  connection.query('SELECT * FROM department', (err, res) => {
    if(err) throw err;
    cb(res);
  })
}

// get Managers that returns the reponse to a callback function
const getManagers = (cb) => {
  connection.query(
    "SELECT * FROM employee WHERE role_id IN (SELECT id FROM role WHERE title LIKE '%manager%')",
    (err, res) => {
    if (err) throw err;
    cb(res);
  });
}

// Add functions that inserts an object into the database
// add employee accepts an employee object and callback
const addEmployee = (employee, cb) => {
  connection.query(
    'INSERT INTO employee SET ?',
    employee,
    (err, res) => {
      if (err) throw err;
      console.log('Employee added.');
      cb();
    });
}

// addRole function that accepts a role object and callback
const addRole = (role, cb) => {
  connection.query(
    'INSERT INTO role SET ?',
    role,
    (err, res) => {
      if (err) throw err;
      console.log('Role added.');
      cb();
    });
}

// addDepartment function that accepts a department object and callback
const addDepartment = (department, cb) => {
  connection.query(
    'INSERT INTO department SET ?',
    department,
    (err, res) => {
      if (err) throw err;
      console.log('Department added.');
      cb();
    });
}

// Delete functions that accepts an ID and deletes the entry on the table where the ID is.
// delete employee deletes an employee by his or her id and accepts a callback
const deleteEmployee = (id, cb) => {
  connection.query(
    'DELETE FROM employee WHERE ?',
    {
      id: id,
    },
    (err, res) => {
      if (err) throw err;
      console.log('Employee removed.');
      cb();
    });
}

// delete role deletes a role by its id and accepts a callback
const deleteRole = (id, cb) => {
  connection.query(
    'DELETE FROM role WHERE ?',
    {
      id: id,
    },
    (err, res) => {
      if (err) throw err;
      console.log('Role removed.');
      cb();
    });
}

// delete department deletes a department by its id and accepts a callback
const deleteDepartment = (id, cb) => {
  connection.query(
    'DELETE FROM department WHERE ?',
    {
      id: id,
    },
    (err, res) => {
      if (err) throw err;
      console.log('Department removed.');
      cb();
    });
}

// Update functions that accept employee id and an additional id to change the entry to. It also accepts a callback function.
// update employee role updates an employee's role and accepts a callback
const updateEmployeeRole = (id, roleId, cb) => {
  connection.query(
    'UPDATE employee SET ? WHERE ?',
    [
      {
        role_id: roleId,
      },
      {
        id: id,
      },
    ],
    (err, res) => {
      if (err) throw err;
      console.log('Employee updated with new role.');
      cb();
    });
}

// update manager updates an employee's manager and accepts a callback
const updateEmployeeManager = (id, managerId, cb) => {
  connection.query(
    'UPDATE employee SET ? WHERE ?',
    [
      {
        manager_id: managerId,
      },
      {
        id: id,
      },
    ],
    (err, res) => {
      if (err) throw err;
      console.log('Employee updated with new manager.');
      cb();
    });
}

// export all functions
module.exports = {
  viewEmployees,
  viewRoles,
  viewDepartments,
  viewEmployeesbyDepartment,
  viewEmployeesbyManager,
  getDepartments,
  getManagers,
  addEmployee,
  addRole,
  addDepartment,
  deleteEmployee,
  deleteRole,
  deleteDepartment,
  updateEmployeeRole,
  updateEmployeeManager
}