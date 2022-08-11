const mysql = require("mysql");

//Connection string for Azure Database
const db = mysql.createConnection({
  user: "application_user",
  host: "spdatabaseserver.mysql.database.azure.com",
  password: "SmartPlacement1",
  database: "sp_database",
  ssl: true,
});

module.exports = db;
