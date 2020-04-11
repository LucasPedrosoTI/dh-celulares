const celulares = require("../database/celulares.json");
const path = require("path");
const fs = require("fs");

let database = path.join("database", "celulares.json");

module.exports = {
    listarCelulares: (req, res) => {
        res.render("listarCelulares", { celulares });
    },
    viewForm: (req, res) => {
        res.render("criarCelular");
    },
    salvarForm: (req, res) => {
        let { nome, preco } = req.body;
        let id = celulares[celulares.length - 1].id + 1;
        let img = `/images/${req.files[0].filename}`;

        // cria o obejto com os dados recebidos do FORM
        let celular = {
            id,
            nome,
            preco: Number(preco),
            img,
        };

        // ADICIONA O OBJETO AO JSON
        celulares.push(celular);

        // SALVAR O ARRAY DE CELULARES NO JSON
        fs.writeFileSync(database, JSON.stringify(celulares));

        // Redirecionar o usuário para a lista de celulares
        res.redirect("/celulares");
    },
    viewAttForm: (req, res) => {
        let { id } = req.params;

        let celular = celulares.find((cel) => cel.id == id);

        res.render("editarCelular", { celular });
    },
    store: (req, res) => {
        let { nome, preco } = req.body;
        let { id } = req.params;
        let img = `/images/${req.files[0].filename}`;

        let celular = celulares.find((cel) => cel.id == id);
        celular.nome = nome;
        celular.preco = Number(preco);
        celular.img = img;

        fs.writeFileSync(database, JSON.stringify(celulares));

        res.redirect("/celulares");
    },
    destroy: (req, res) => {
        let { id } = req.params;

        celulares.splice(
            celulares.findIndex((e) => e.id == id),
            1
        );

        fs.writeFileSync(database, JSON.stringify(celulares));

        res.redirect("/celulares");
    },
    priceFilter: (req, res) => {
        let { max } = req.query;

        let celularesFiltrados = celulares.filter((celular) => celular.preco < max);

        res.render("listarCelulares", { celulares: celularesFiltrados });
    },
    class: (req, res) => {
        // MÉTODO PARA CLASSIFICAR POR PREÇO

        let { minToMax, maxToMin, alfabetica } = req.query;

        if (minToMax) {
            let result = celulares.sort((a, b) => a.preco - b.preco);
            res.render("listarCelulares", { celulares: result });
        } else if (maxToMin) {
            let result = celulares.sort((a, b) => b.preco - a.preco);
            res.render("listarCelulares", { celulares: result });
        } else if (alfabetica) {
            let result = celulares.sort((a, b) => a.nome.localeCompare(b.nome));
            res.render("listarCelulares", { celulares: result });
        } else {
            return res.render("listarCelulares", { celulares });
        }
    },
    ver: (req, res) => {
        let dados = fs.readFileSync(database, { encoding: "utf-8" });

        dados = JSON.parse(dados);

        res.send(dados);
    },
};