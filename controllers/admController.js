const path = require("path");
const fs = require("fs");
const users = require("../database/admin.json");
const bcrypt = require("bcrypt");

let database = path.join("database", "admin.json");

module.exports = {
    login: (req, res) => {
        res.render("login");
    },
    entrar: (req, res) => {
        let { username, senha } = req.body;

        let user = users.find(
            (user) =>
            user.username == username && bcrypt.compareSync(senha, user.senha)
        );

        if (!user) {
            return res.send("Usuário ou Senha inválida");
        }

        // if (!bcrypt.compareSync(senha, user.senha)) {
        //     return res.send("Senha Inválida");
        // }

        res.redirect("/celulares");
    },
    signup: (req, res) => {
        res.render("signup");
    },
    cadastrar: (req, res) => {
        let hash = bcrypt.hashSync(req.body.senha, 10);

        let newUser = {
            username: req.body.username,
            senha: hash,
        };

        users.push(newUser);

        fs.writeFileSync(database, JSON.stringify(users));

        res.redirect("/login");
    },
};