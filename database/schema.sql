DROP DATABASE IF EXISTS managementDB;

CREATE DATABASE managementDB;

USE managementDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT REFERENCES employee(id),
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id)
);

INSERT INTO department (name)
VALUES
("production"),
("marketing"),
("sales");

INSERT INTO role (title, salary, department_id)
VALUES
("production manager", 100000, 1),
("marketing manager", 100000, 2),
("sales manager", 100000, 3),
("production intern", 20000, 1),
("marketing intern", 20000, 2),
("sales intern", 20000, 3),
("engineer", 80000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Providence", "Germaan", 1, NULL),
("Mark","Man", 2, NULL),
("Sally","Regan", 3, NULL);
