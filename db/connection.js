const mysql = require('mysql');

const DB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecoenergix',
});

DB.connect((err) => {
  if (err) throw err;
  console.log('Conexión exitosa a MySQL!');
});

module.exports = DB;
