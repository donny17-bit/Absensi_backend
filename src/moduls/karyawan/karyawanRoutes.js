const express = require("express");

const Router = express.Router();

const karyawanController = require("./karyawanController");
const middlewareAuth = require("../../middleware/auth");
const middlewareImage = require("../../middleware/uploadImage");

Router.get("/", karyawanController.getAllKaryawan);
Router.post("/", karyawanController.createKaryawan);
Router.get("/:id", karyawanController.getKaryawanById);
Router.patch("/:id", middlewareImage, karyawanController.updateKaryawanById);

module.exports = Router;
