const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'managementDB',
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Successfully connected to mySQL. Connected as id ${connection.threadId}`);
});

module.exports = connection;