const express = require("express");
const Router = express.Router();

const karyawanRoutes = require("../moduls/karyawan/karyawanRoutes");
// const tanggalRoutes = require("../moduls/tanggal/tanggalRoutes");

Router.use("/karyawan", karyawanRoutes);
// Router.use("/tanggal", tanggalRoutes);

module.exports = Router;
