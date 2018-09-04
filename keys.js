require('dotenv').config();
exports.mysql = {
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
};
