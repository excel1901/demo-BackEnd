"use strict";
var response = require("./res");
var connection = require("./conn");
var passwordHash = require("password-hash");
var md5 = require("md5");
const jwt = require("jsonwebtoken");
const config = require("./config");
const tokenList = {};
const tokenUserLogin = {};

const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

//GET ALL USER
exports.users = function (req, res) {
  connection.query("select * from user", function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//GET ALL PELANGGAN
exports.customers = function (req, res) {
  connection.query("select * from pelanggan", function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//GET ALL PRODUK
exports.products = function (req, res) {
  connection.query("select * from produk", function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//GET ALL TRANSAKSI
exports.transactions = function (req, res) {
  connection.query(
    "select pl.nama,pr.nama_produk from transaksi t, produk pr, pelanggan pl where t.email_pelanggan = pl.email and t.produk_id = pr.produk_id",
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//POST PRODUK
exports.insertProduk = function (req, res) {
  const postData = req.body;
  const data = {
    nama_produk: postData.nama_produk,
  };
  if (postData.token && postData.token in tokenUserLogin) {
    connection.query("INSERT INTO produk set ? ", [data], function (
      error,
      rows,
      fields
    ) {
      if (error) {
        console.log(error);
        const response = {
          error: error.sqlMessage,
        };
        res.status(400).json(response);
      } else {
        const response = {
          status: "Produk Disimpan",
        };
        res.status(200).json(response);
      }
    });
  } else {
    const response = {
      status: "invalid request, check your token first ..",
    };
    res.status(404).send(response);
  }
};

//POST PELANGGAN
exports.insertPelanggan = function (req, res) {
  const postData = req.body;
  const data = {
    email: postData.email,
    nama: postData.nama,
    alamat: postData.alamat,
  };
  if (postData.token && postData.token in tokenUserLogin) {
    connection.query("INSERT INTO pelanggan set ? ", [data], function (
      error,
      rows,
      fields
    ) {
      if (error) {
        console.log(error);
        const response = {
          error: error.sqlMessage,
        };
        res.status(400).json(response);
      } else {
        const response = {
          status: "Pelanggan Disimpan",
        };
        res.status(200).json(response);
      }
    });
  } else {
    const response = {
      status: "invalid request, check your token first ..",
    };
    res.status(404).send(response);
  }
};

//POST TRANS
exports.insertTrans = function (req, res) {
  const postData = req.body;
  const data = {
    email_pelanggan: postData.email_pelanggan,
    produk_id: postData.produk_id,
  };
  if (postData.token && postData.token in tokenUserLogin) {
    connection.query("INSERT INTO transaksi set ? ", [data], function (
      error,
      rows,
      fields
    ) {
      if (error) {
        console.log(error);
        const response = {
          error: error.sqlMessage,
        };
        res.status(400).json(response);
      } else {
        const response = {
          status: "Transaksi Disimpan",
        };
        res.status(200).json(response);
      }
    });
  } else {
    const response = {
      status: "invalid request, check your token first ..",
    };
    res.status(404).send(response);
  }
};

//POST REGISTER
exports.register = function (req, res) {
  const postData = req.body;
  const data = {
    username: postData.username,
    password: postData.password,
  };
  connection.query("INSERT INTO user set ? ", [data], function (
    error,
    rows,
    fields
  ) {
    if (error) {
      console.log(error);
      const response = {
        error: error.sqlMessage,
      };
      res.status(400).json(response);
    } else {
      const response = {
        status: "Registered",
      };
      res.status(200).json(response);
    }
  });
};

//POST LOGIN
exports.login = function (req, res) {
  const postData = req.body;
  const user = {
    username: postData.username,
    password: postData.password,
  };
  connection.query(
    'SELECT * from user where username="' +
      user.username +
      '" and password="' +
      user.password +
      '"',
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        const response = {
          error: error.sqlMessage,
        };
        res.status(400).json(response);
      } else {
        if (rows.length >= 1) {
          const token = jwt.sign(user, config.secret, {
            expiresIn: config.tokenLife,
          });
          const response = {
            status: "Logged in",
            token: token,
          };
          tokenUserLogin[token] = response;
          res.status(200).json(response); //artinya sukses
        } else {
          const response = {
            status: "Login Failed",
            message: "User not found",
          };
          res.status(200).json(response);
        }
      }
    }
  );
};

exports.index = function (req, res) {
  response.ok("Hello Word", res);
};
