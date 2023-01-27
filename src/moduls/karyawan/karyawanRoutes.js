const express = require("express");

const Router = express.Router();

const karyawanController = require("./karyawanController");
const middlewareAuth = require("../../middleware/auth");
const middlewareImage = require("../../middleware/uploadImage");

// Router.get("/", (req, res) => {
//   res.send("sukses");
// });

Router.get("/", karyawanController.getAllKaryawan);
Router.get("/:id", karyawanController.getKaryawanById);

module.exports = Router;
