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

  updateKaryawanById: async (request, response) => {
    try {
      const { id } = request.params;
      console.log(id);
      // console.log(request.body);
      // console.log(request.file);
      // console.log(request.file.data);

      const cekId = await karyawanModel.getKaryawanById(id);

      if (cekId.length <= 0) {
        console.log(cekId.length);
        return helperWrapper.response(
          response,
          404,
          `Data by id ${id} not found`,
          null
        );
      }

      const { mimetype } = request.file;
      let { filename } = request.file;

      if (mimetype === "image/jpeg") {
        filename += ".jpg";
      } else if (mimetype === "image/png") {
        filename += ".png";
      }

      const { fullName, password, nickname } = request.body;

      const setData = {
        fullName,
        password,
        nickname,
        image: filename,
        updateAt: new Date(Date.now()),
      };

      for (const data in setData) {
        if (!setData[data]) {
          // console.log(setData[data]);
          // delete setData[data];
        }
      }
    } catch (error) {
      console.log(error);
      helperWrapper.response(response, 400, "bad request", null);
    }
  },
};
