// const redis = require("../../config/redis");
const helperWrapper = require("../../helpers/wrapper");
const tanggalModel = require("./tanggalModel");

module.exports = {
  getTanggalById: async (request, response) => {
    try {
      const { id } = request.params;

      const result = await tanggalModel.getTanggalById(id);
      return helperWrapper.response(response, 200, "sukses get data", result);
    } catch (error) {
      helperWrapper.response(response, 400, "bad request", error.message);
    }
  },
  getTanggalByIdAndTgl: async (request, response) => {
    try {
      const { idKaryawan, tanggal } = request.query;

      const result = await tanggalModel.getTanggalByTanggal(
        tanggal,
        idKaryawan
      );
      return helperWrapper.response(response, 200, "sukses get data", result);
    } catch (error) {
      helperWrapper.response(response, 400, "bad request", error.message);
    }
  },
  createAbsensi: async (request, response) => {
    try {
      const { id } = request.params;

      const { jamMasuk, jamPulang, alasanTelat, alasanTidakMasuk } =
        request.body;
      let { tanggal } = request.body;

      if (!tanggal) {
        tanggal = new Date();
      }

      const setData = {
        tanggal,
        idKaryawan: id,
        jamMasuk,
        jamPulang,
        alasanTelat,
        alasanTidakMasuk,
      };

      const result = await tanggalModel.createAbsensi(setData);
      return helperWrapper.response(
        response,
        200,
        "sukses create absensi data",
        result
      );
    } catch (error) {
      helperWrapper.response(response, 400, "bad request", error.message);
    }
  },
  updateAbsensiById: async (request, response) => {
    try {
      const { id } = request.params;

      const { jamPulang, alasanTelat, alasanTidakMasuk } = request.body;
      let { tanggal } = request.body;
      const date = new Date();

      if (!tanggal) {
        tanggal = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;
      }

      const cekTanggal = await tanggalModel.getTanggalByTanggal(tanggal, id);

      if (cekTanggal.length <= 0) {
        return helperWrapper.response(
          response,
          200,
          `Karyawan dengan id ${id} belum melakukan absensi masuk pada tanggal ${tanggal}`,
          null
        );
      }

      const setData = {
        idKaryawan: id,
        jamPulang,
        alasanTelat,
        alasanTidakMasuk,
        updatedAt: date,
      };

      const result = await tanggalModel.updateAbsensi(setData, id, tanggal);
      return helperWrapper.response(
        response,
        200,
        "success update absensi data",
        result
      );
    } catch (error) {
      helperWrapper.response(response, 400, "bad request", error.message);
    }
  },
};
