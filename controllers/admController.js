const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { Admin } = require("../models");
// const path = require("path");
// const fs = require("fs");
// const users = require("../database/admin.json");
// let database = path.join("database", "admin.json");

module.exports = {
  login: (req, res) => {
    res.render("login");
  },
  entrar: async (req, res) => {
    let { username, senha, logado } = req.body;

    if (!username || !senha) {
      return res.status(400).send("Request missing username or password param");
    }

    try {
      let users = await Admin.findAll();

      let user = users.find(
        (user) =>
          user.username == username && bcrypt.compareSync(senha, user.senha)
      );

      if (!user) {
        return res.send("Usuário ou Senha inválida");
      }

      req.session.usuario = user;

      if (logado != undefined) {
        res.cookie("logado", user.username, { maxAge: 3600000 });
      }

      res.redirect("/celulares");
    } catch (err) {
      return res.status(400).send("invalid username or password");
    }

    // bcrypt.compareSync(senha, user.senha);

    // // let user =  await Admin.findOne({ where: { username, senha: senha })

    // let user = users.find(
    //   (user) =>
    //     user.username == username && bcrypt.compareSync(senha, user.senha)
    // );

    // if (!user) {
    //   return res.send("Usuário ou Senha inválida");
    // }

    // req.session.usuario = user;

    // if (logado != undefined) {
    //   res.cookie("logado", user.username, { maxAge: 600000 });
    // }

    // res.redirect("/celulares");
  },
  signup: (req, res) => {
    res.render("signup");
  },
  cadastrar: async (req, res) => {
    let listaDeErros = validationResult(req);

    if (listaDeErros.isEmpty()) {
      let hash = bcrypt.hashSync(req.body.senha, 10);

      try {
        // create a new user with the password hash from bcrypt
        let user = await Admin.create({
          username: req.body.username,
          senha: hash,
        });

        return res.render("login", { user });
      } catch (err) {
        return res.status(400).send(err);
      }

      //   await Admin.create({
      //     username: req.body.username,
      //     senha: hash,
      //   });

      //   let newUser = {
      //     username: req.body.username,
      //     senha: hash,
      //   };

      //   users.push(newUser);

      //   fs.writeFileSync(database, JSON.stringify(users));

      //   res.redirect("/login");
    } else {
      res.render("signup", { errors: listaDeErros.errors });
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    req.session = null;
    // req.cookies.set("testtoken", { expires: Date.now() });
    res.redirect("/login");
  },
};
