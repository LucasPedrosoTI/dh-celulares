const fs = require("fs");

module.exports = {
    logSite: (req, res, next) => {
        fs.appendFileSync("log.txt", "O usuário entrou na URL: " + req.url);
        next();
    },

    logDB: (req, res, next) => {
        fs.appendFileSync(
            "logDB.txt",
            "Foi criado um registro pela URL: " + req.url
        );
        next();
    },
};