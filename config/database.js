require("dotenv").config();
//mysql://bb4a029cba3986:f732445b@us-cdbr-iron-east-01.cleardb.net/heroku_bdef586a5063294?reconnect=true
const config = {
  username: "bb4a029cba3986",
  password: "f732445b",
  database: "heroku_bdef586a5063294",
  host: "us-cdbr-iron-east-01.cleardb.net",
  //port: process.env.DB_PORT,
  dialect: "mysql",
};

module.exports = config;
