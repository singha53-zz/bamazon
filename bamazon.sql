DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(50) NULL,
  price DECIMAL (10, 4) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('Eloquent Javascript', 'Books', 36.63, 100), ('Learning Python', 'Books', 50.21, 100), 
('Asus Rugged Chromebook', 'Electronics', 199.99, 100), ('World of Warcraft', 'Electronics', 34.99, 100), 
('TV Wall Mount Bracket', 'Furniture', 17.99, 100), ('Velvet Futon', 'Furniture', 454.90, 100), 
('Flex Yoga Pants', 'Clothing', 19.99, 100), ('Shawl', 'Clothing', 24.99, 100),
('bike pump', 'Sports', 37.99, 100), ('Fitbit Flex 2', 'Sports', 79.95, 100);

SELECT * FROM products;