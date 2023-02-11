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
};
