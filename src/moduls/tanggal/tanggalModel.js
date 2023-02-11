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
  // getTanggalByMonth: (tanggal, idKaryawan) =>
  //   new Promise((resolve, reject) => {
  //     connection.query(
  //       "SELECT * FROM tanggal WHERE tanggal = ? AND idKaryawan = ?",
  //       [tanggal, idKaryawan],
  //       (error, result) => {
  //         if (!error) {
  //           resolve(result);
  //         } else {
  //           reject(new Error(error.sqlMessage));
  //         }
  //       }
  //     );
  //   }),
  getTanggalByTanggal: (tanggal, idKaryawan) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM tanggal WHERE tanggal LIKE '${tanggal}%' AND idKaryawan = ?`,
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
  updateAbsensi: (data, idKaryawan, tanggal) =>
    new Promise((resolve, reject) => {
      connection.query(
        `UPDATE tanggal SET ? WHERE idKaryawan = ? AND tanggal = '?'`,
        [data, idKaryawan, tanggal],
        (error) => {
          if (!error) {
            const newResult = {
              idKaryawan,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
    }),
};
