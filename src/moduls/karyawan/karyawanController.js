// const redis = require("../../config/redis");
const helperWrapper = require("../../helpers/wrapper");
const cloudinary = require("../../config/cloudinary");
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

      const result = await karyawanModel.getKaryawanById(id);
      return helperWrapper.response(response, 200, "sukses get data", result);
    } catch (error) {
      console.log(error);
      helperWrapper.response(response, 400, "bad request", null);
    }
  },

  createKaryawan: async (request, response) => {
    try {
      const { email, password, fullName, nickname } = request.body;
      const cekEmail = await karyawanModel.getKaryawanByEmail(email);

      if (cekEmail.length > 0) {
        return helperWrapper.response(
          response,
          404,
          `Data with email ${email} already existed`,
          null
        );
      }

      const setData = {
        email,
        password,
        fullName,
        nickname,
      };

      const result = await karyawanModel.createKaryawan(setData);

      return helperWrapper.response(
        response,
        200,
        "Success create data karyawan",
        result
      );
    } catch (error) {
      helperWrapper.response(response, 400, "bad request", error.message);
    }
  },

  updateKaryawanById: async (request, response) => {
    try {
      const { id } = request.params;
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
        updatedAt: new Date(Date.now()),
      };

      // cek apakah di request ada yg kosong tidak, jika iya maka dihapus
      // untuk diupdate yang hanya ada isinya saja, dan agar tidak error di model
      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
      }

      // cek and delete current image in cloudinary
      const { image } = cekId[0];

      if (image) {
        cloudinary.uploader.destroy(image.slice(0, image.length - 4), () => {
          console.log("data has been deleted in cloudinary");
        });
      }

      const result = await karyawanModel.updateKaryawan(setData, id);

      return helperWrapper.response(
        response,
        200,
        "sukses update data",
        result
      );
    } catch (error) {
      console.log(error);
      helperWrapper.response(response, 400, "bad request", null);
    }
  },
};
