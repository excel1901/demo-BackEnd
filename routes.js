"use strict";

module.exports = function (app) {
  var daftar = require("./controller");
  app.route("/").get(daftar.index);

  app.route("/produk").post(daftar.insertProduk);
  app.route("/pelanggan").post(daftar.insertPelanggan);
  app.route("/transaksi").post(daftar.insertTrans);
  app.route("/register").post(daftar.register);
  app.route("/login").post(daftar.login);
  app.use(require("./tokenChecker"));
};
