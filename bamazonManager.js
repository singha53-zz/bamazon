require('dotenv').config();
const config = require('./config.js');
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const chalkPipe = require('chalk-pipe');
let connection = mysql.createConnection(config);

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
          return increaseQuantity();
        case '4. Add New Product':
          return addNewItem();
      }
    });
}

function displayProducts() {
  connection.query('SELECT * FROM products', (err, res) => {
    console.table(res);
  });
}

function viewProducts() {
  displayProducts();
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
      } else {
        console.table(res);
      }
    }
  );
  connection.end();
}

function validateID(id, res) {
  var ids = res.map(d => {
    return d.id;
  });
  if (!ids.includes(parseInt(id))) {
    console.log(`\n id:${id} does not match any inventory ids...`);
  }
  if (
    isNaN(parseInt(id)) ||
    parseInt(id) === '' ||
    !Number.isInteger(parseInt(id)) ||
    !ids.includes(parseInt(id))
  ) {
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

function increaseQuantity() {
  connection.query('SELECT * FROM products', (err, res) => {
    console.table(res);
    increaseQuantity_userInput(res);
  });
}

function increaseQuantity_userInput(res) {
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'Enter ID of product you would like add more of...',
        validate: function(id) {
          return validateID(id, res);
        }
      },
      {
        name: 'quantity',
        type: 'input',
        message: 'Enter how many unit(s) you would like to add?',
        validate: validateQuantity
      }
    ])
    .then(answer => {
      connection.query(
        'SELECT * FROM products WHERE ?',
        {
          id: answer.id
        },
        function(err, res) {
          if (err) throw err;
          increaseQuantity_update(
            (id = answer.id),
            (quantity = parseInt(answer.quantity)),
            (stockQuantity = parseInt(res[0].stock_quantity))
          );
        }
      );
    });
}

function increaseQuantity_update(id, quantity, stockQuantity) {
  var quantityUpdate = stockQuantity + quantity;
  connection.query(
    'UPDATE products SET ? WHERE ?',
    [
      {
        stock_quantity: quantityUpdate
      },
      {
        id: id
      }
    ],
    function(err, res) {
      if (err) throw err;
    }
  );

  // display table of products again
  connection.query('SELECT * FROM products', (err, res) => {
    console.table(res);
    var updatedItem = res.filter(d => {
      return d.id === parseInt(id);
    });

    console.log(
      chalkPipe('blue.bold')(
        `You have added ${quantity} unit(s) of ${
          updatedItem[0].product_name
        } to the inventory for a total of ${
          updatedItem[0].stock_quantity
        } unit(s).`
      )
    );
  });

  connection.end();
}

function addNewItem() {
  inquirer
    .prompt([
      {
        name: 'product_name',
        type: 'input',
        message: 'Enter new product name.'
      },
      {
        name: 'department_name',
        type: 'input',
        message: 'Enter department designation of product.'
      },
      {
        name: 'price',
        type: 'input',
        message: 'Enter price of product.'
      },
      {
        name: 'quantity',
        type: 'input',
        message: 'Enter quantity of product.'
      }
    ])
    .then(answer => {
      insertItem(answer);
    });
}

function insertItem(answer) {

  var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?";
  var values = [
    [answer.product_name, answer.department_name, parseFloat(answer.price), parseInt(answer.quantity)]
  ]

  connection.query(query, [values], (err, res) => {
    if (err) throw err;

    connection.query('SELECT * FROM products', (err, res) => {
      console.table(res);
  
      console.log(
        chalkPipe('blue.bold')(
          `New item has been added!`
        )
      );
    });
    connection.end();

  });
}
