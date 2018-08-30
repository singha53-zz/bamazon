var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'bamazonDB'
})

// Connect to database
connection.connect(err => {
  if (err) throw err;
  console.log("Connection ID: " + connection.threadId)
  displayItems()
  connection.end()
});

function displayItems(){
  connection.query('SELECT * FROM products', (err, res) => {
console.log(res)
  })
}