const path = require("path");
const fs = require("fs");

const cookieLogin = (req, res, next) => {
    if (req.cookies.logado != undefined && req.session.usuario == null) {
        let cookieUsername = req.cookies.logado;

        let usuarios = JSON.parse(
            fs.readFileSync(path.join("database", "admin.json"), {
                encoding: "utf-8",
            })
        );

        let user = usuarios.find((user) => user.username == cookieUsername);

        if (user.username == cookieUsername) {
            req.session.usuario = user;
        }
    }
    next();
};

module.exports = cookieLogin;