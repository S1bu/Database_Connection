require('dotenv').config();
const { createPool } = require("mysql");
const connection = createPool({
  host: process.env.dbHost,
  database: process.env.dbName,
  user: process.env.dbUser,
  password: process.env.dbPwd,
  multiStatements: true,
  connectionLimit: 30
});

// exporting this variable so we can use it anywhere else
module.exports = connection;
