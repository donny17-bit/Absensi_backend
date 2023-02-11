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
  createAbsensi: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO tanggal SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data,
          };
          resolve(newResult);
        } else {
          reject(new Error(error.sqlMessage));
        }
      });
    }),
};
