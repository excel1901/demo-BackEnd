var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "demo_web",
});
conn.connect(function (err) {
  if (err) throw err;
});

module.exports = conn;
