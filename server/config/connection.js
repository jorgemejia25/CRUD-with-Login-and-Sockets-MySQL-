var mysql = require("mysql");
var con = mysql.createConnection({
    host: "-----",
    user: "-----",
    password: "-----",
    database: "------",
    port: 000000,
});

module.exports = {
    con,
};