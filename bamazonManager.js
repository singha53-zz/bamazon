var inquirer = require('inquirer');
var mysql = require('mysql');
const cTable = require('console.table');
const chalkPipe = require('chalk-pipe');

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
  managerView();
});

function managerView() {
  inquirer
    .prompt({
      type: 'list',
      name: 'options',
      message: 'Menu options',
      choices: [
        '1. View Products for Sale',
        new inquirer.Separator(),
        '2. View Low Inventory',
        new inquirer.Separator(),
        '3. Add to Inventory',
        new inquirer.Separator(),
        '4. Add New Product'
      ]
    })
    .then(res => {
      switch (res.options) {
        case '1. View Products for Sale':
          return viewProducts();
        case '2. View Low Inventory':
          return viewLowInventory();
        case '3. Add to Inventory':
          return addItemQuantity();
        case '4. Add New Product':
          return addNewItem();
      }
    });
}

function viewProducts() {
  connection.query('SELECT * FROM products', (err, res) => {
    console.table(res);
  });
  connection.end();
}

function viewLowInventory() {
  connection.query(
    'SELECT * FROM products WHERE stock_quantity < 5',
    (err, res) => {
      if (res[0] === undefined) {
        console.log(
          chalkPipe('blue.bold')('No products have less than 5 units!')
        );
      }
    }
  );
  connection.end();
}

function addItemQuantity() {
  console.log('addItemQuantity');
}

function addNewItem() {
  console.log('addNewItems');
}
