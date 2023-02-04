const mySql = require("mysql2");

const connection = mySql.createConnection({
  host: "db4free.net",
  user: "project_absensi",
  password: "absensi1",
  database: "absensi_karyawan",
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("you are now connect to DB mysql");
});

module.exports = connection;
