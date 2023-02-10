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
};
