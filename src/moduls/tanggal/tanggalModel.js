const connection = require("../../config/mySql");

module.exports = {
  getTanggalById: (idKaryawan) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM tanggal WHERE idKaryawan = ?",
        idKaryawan,
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
