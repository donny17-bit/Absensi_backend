const mySql = require("mysql2");

const connection = mySql.createConnection({
  host: "127.0.0.1",
  user: "postgres",
  password: "123456789",
  database: "absensi",
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("you are now connect to DB mysql");
});

module.exports = connection;
