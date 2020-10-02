"use strict";

module.exports = function (app) {
  // Add headers
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
  });
  const cors = require("cors");
  var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.use(cors(corsOptions));

  var daftar = require("./controller");

  app.route("/").get(daftar.index);
  app.route("/users").get(daftar.users);
  app.route("/customers").get(daftar.customers);
  app.route("/products").get(daftar.products);
  app.route("/transactions").get(daftar.transactions);

  app.route("/produk").post(daftar.insertProduk);
  app.route("/pelanggan").post(daftar.insertPelanggan);
  app.route("/transaksi").post(daftar.insertTrans);
  app.route("/register").post(daftar.register);
  app.route("/login").post(daftar.login);
  app.use(require("./tokenChecker"));
};
