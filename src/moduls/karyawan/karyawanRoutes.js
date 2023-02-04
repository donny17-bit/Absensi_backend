const express = require("express");

const Router = express.Router();

const karyawanController = require("./karyawanController");
const middlewareAuth = require("../../middleware/auth");
const middlewareImage = require("../../middleware/uploadImage");

Router.get("/", karyawanController.getAllKaryawan);
Router.get("/:id", karyawanController.getKaryawanById);
Router.patch("/:id", middlewareImage, karyawanController.updateKaryawanById);
// Router.post("/:id", karyawanController.updateKaryawanById);

module.exports = Router;
