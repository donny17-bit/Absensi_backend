const express = require("express");
const Router = express.Router();

const karyawanRoutes = require("../moduls/karyawan/karyawanRoutes");

Router.use("/karyawan", karyawanRoutes);

module.exports = Router;
