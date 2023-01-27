const connection = require("../../config/mySql");

module.exports = {
  getAllKaryawan: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM karyawan", (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error.sqlMessage));
        }
      });
    });
  },
  getKaryawanById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM karyawan WHERE id = ?",
        id,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
    }),
};
