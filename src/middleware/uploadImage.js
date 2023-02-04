const multer = require("multer");

const storage = multer.diskStorage({
  destination(request, file, cb) {
    cb(null, "public/karyawan");
  },
  filename(request, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({
  storage,
}).single("image");

const handlingUpload = (request, response, next) => {
  upload(request, response, (error) => {
    if (error instanceof multer.MulterError) {
      return helperWrapper.response(response, 401, error.message, null);
      // A Multer error occurred when uploading.
    }
    if (error) {
      return helperWrapper.response(response, 401, error.message, null);
      // An unknown error occurred when uploading.
    }
  });

  return next();
};

module.exports = handlingUpload;
