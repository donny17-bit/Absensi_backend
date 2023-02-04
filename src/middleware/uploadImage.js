const multer = require("multer");

const upload = multer({
  dest: "public/karyawan",
}).single("image");

// const handlingUpload = (request, response, callback) => {
//     upload()
// }

module.exports = upload;
