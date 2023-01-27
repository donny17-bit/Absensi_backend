// const redis = require("../../config/redis");
const helperWrapper = require("../../helpers/wrapper");
// const cloudinary = require("../../config/cloudinary");
const karyawanModel = require("./karyawanModel");

module.exports = {
  getAllKaryawan: async (request, response) => {
    try {
      const result = await karyawanModel.getAllKaryawan();
      return helperWrapper.response(response, 200, "sukses get data", result);
    } catch (error) {
      console.log(error);
      helperWrapper.response(response, 400, "bad request", null);
    }
  },

  getKaryawanById: async (request, response) => {
    try {
      const { id } = request.params;
      console.log(request.params);

      const result = await karyawanModel.getKaryawanById(id);
      return helperWrapper.response(response, 200, "sukses get data", result);
    } catch (error) {
      console.log(error);
      helperWrapper.response(response, 400, "bad request", null);
    }
  },
};
