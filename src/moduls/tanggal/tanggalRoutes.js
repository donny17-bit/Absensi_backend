const express = require("express");

const Router = express.Router();

const tanggalController = require("./tanggalController");
const middlewareAuth = require("../../middleware/auth");

// Router.get("/", tanggalController.getAllKaryawan);
// Router.post("/:id", tanggalController.createKaryawan);
Router.get("/:id", tanggalController.getTanggalById);
// Router.patch("/:id", tanggalController.updateKaryawanById);

module.exports = Router;
