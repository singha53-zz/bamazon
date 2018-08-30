var inquirer = require('inquirer');
var mysql = require('mysql');
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'bamazonDB'
});

// Connect to database
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to Database: connection id = ' + connection.threadId);
  displayItems();
  connection.end();
});

function displayItems() {
  console.log('Items for sale');
  connection.query(
    'SELECT id, product_name, department_name, price FROM products',
    (err, res) => {
      console.table(res);
      buyItems(res);
    }
  );
}

function buyItems(res) {
  console.log('\n buy items:' + res);
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'Enter ID of product you would like to buy?',
        validate: function(value) {
          return validateID(value, res);
        }
      },
      {
        name: 'quantity',
        type: 'input',
        message: 'Enter how many unit you would like to buy?',
        validate: validateQuantity
      }
    ])
    .then(answer => {
      console.log('item: ' + answer.id);
      console.log('quantity: ' + answer.quantity);
    });
}

function validateID(id, res) {
  var ids = res.map(d => {return d.id})
  if(!ids.includes(parseInt(id))){
    console.log(`\n Id:${id} does not match any inventory ids...`)
  }
  if (
    isNaN(parseInt(id)) ||
    parseInt(id) === '' ||
    !Number.isInteger(parseInt(id)) || !ids.includes(parseInt(id))) {
    return 'Please enter a valid ID...';
  } else {
    return true;
  }
}

function validateQuantity(quantity) {
  if (
    isNaN(parseInt(quantity)) ||
    parseInt(quantity) === '' ||
    !Number.isInteger(parseInt(quantity))
  ) {
    return 'Quantity should be a number!';
  } else {
    return true;
  }
}

function checkOrder() {}
