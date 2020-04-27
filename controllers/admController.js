const path = require("path");
const fs = require("fs");
const users = require("../database/admin.json");
const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");

let database = path.join("database", "admin.json");

module.exports = {
    login: (req, res) => {
        res.render("login");
    },
    entrar: (req, res) => {
        let { username, senha, logado } = req.body;

        let user = users.find(
            (user) =>
            user.username == username && bcrypt.compareSync(senha, user.senha)
        );

        if (!user) {
            return res.send("Usuário ou Senha inválida");
        }

        req.session.usuario = user;

        if (logado != undefined) {
            res.cookie("logado", user.username, { maxAge: 600000 });
        }

        res.redirect("/celulares");
    },
    signup: (req, res) => {
        res.render("signup");
    },
    cadastrar: (req, res) => {
        let listaDeErros = validationResult(req);

        if (listaDeErros.isEmpty()) {
            let hash = bcrypt.hashSync(req.body.senha, 10);

            let newUser = {
                username: req.body.username,
                senha: hash,
            };

            users.push(newUser);

            fs.writeFileSync(database, JSON.stringify(users));

            res.redirect("/login");
        } else {
            res.render("signup", { errors: listaDeErros.errors });
        }
    },
};