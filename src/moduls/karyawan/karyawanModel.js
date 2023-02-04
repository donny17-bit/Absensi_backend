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
  updateKaryawan: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE karyawan SET ? WHERE id = ?",
        [data, id],
        (error) => {
          if (!error) {
            const newResult = {
              id,
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
