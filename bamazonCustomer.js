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
});

function displayItems() {
  console.log('Items for sale');
  connection.query('SELECT id, product_name, department_name, price FROM products', (err, res) => {
    console.table(res);
    buyItems(res);
  });
}

function buyItems(res) {
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'Enter ID of product you would like to buy?',
        validate: function(id) {
          return validateID(id, res);
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
      checkOrder((id = answer.id), (quantity = answer.quantity));
    });
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

function checkOrder(id, quantity) {
  connection.query(
    'SELECT * FROM products WHERE ?',
    {
      id: id
    },
    function(err, res) {
      if (err) throw err;
      var quantityInventory = parseInt(res[0].stock_quantity);
      var quantityRequested = parseInt(quantity);

      if (quantityRequested <= quantityInventory) {
        console.log(
          `You have purchased ${quantityRequested} units of ${
            res[0].product_name
          } for a total cost of $${quantityRequested *
            parseFloat(res[0].price)}`
        );
        return updateQuantity(
          (id = res[0].id),
          (quantity = quantityInventory - quantityRequested)
        );
      } else {
        console.log(`Insufficient quantity!`);
        connection.end();
      }
    }
  );
}

function updateQuantity(id, quantity) {
  connection.query('UPDATE products SET ? WHERE ?', [
    {
      stock_quantity: quantity
    },
    {
      id: id
    }
  ], function(err, result){
    if (err) throw err;
  });
  connection.end();
}
