# bamazon

Bamazon is an Amazon-like command line application using Node.js and MySQL. The current application allows customers to order specific items using the item id and the number of quantities to purchase. Managers can use the application to view products for sale, view items with low inventory (stock quantity less than 5), increase quantity of items in the inventory and add new items to the inventory.

## Installing
### Logging In to SQL Server
- download MYSQL Workbench (https://dev.mysql.com/downloads/workbench/) and the MySQL Community Server (https://dev.mysql.com/downloads/mysql/)
- Set up host, user and password by clicking on the "+" icon: <img width="30%" height="20%" src="https://github.com/singha53/bamazon/blob/master/media/mysqlConnections.png">

### Copy remote repoistory and app setup
- assuming node and npm are installed. 

```shell
$ git clone https://github.com/singha53/bamazon.git
$ cd bamazon/
$ npm install
```
### Create SQL database
- open SQL script, bamazon.sql and run script in MySQL Workbench to create database, bamazonDB.

## Walkthroughs
### 1) Customer View:

### 2) Manager View: 

## Programming Languages / Databases

- JavaScript (Node.js, v8.11.2)
- MySQL
- npm (v6.4.0) packages (inquirer, mysql, console.table, chalk-pipe)

## Features

- search for tweets, songs and movies

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Links

- Repository: https://github.com/singha53/https://github.com/singha53/node-liri-app/

## Licensing

The code in this project is licensed under MIT license.
