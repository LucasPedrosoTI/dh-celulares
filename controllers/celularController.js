const Sequelize = require("sequelize");
const config = require("../config/database");
const { Celular } = require("../models");

const db = new Sequelize(config);

module.exports = {
  listarCelulares: async (req, res) => {
    let { page = 1, order = "id-asc", max, key = "" } = req.query;

    let mostExpensive = await Celular.max("preco"); //retorna o produto mais caro do DB

    max = max || mostExpensive; // atribui a max o produto mais caro, caso não tenha sido passado esse parametro no filtro de preço.

    let classify = order.split("-"); // converte a string passada no input order em um array separando pelo hífen, sendo o resultado, o array aceito pelo sequelize para ordenar

    let { count: total, rows: celulares } = await Celular.findAndCountAll({
      limit: 5,
      offset: (page - 1) * 5,
      where: {
        nome: {
          [Sequelize.Op.like]: `%${key}%`,
        },
        preco: {
          [Sequelize.Op.lte]: max,
        },
      },
      order: [classify],
    });

    let totalPagina = Math.ceil(total / 5);

    res.render("listarCelulares", {
      max,
      celulares,
      usuario: req.session.usuario,
      totalPagina,
      order,
      key,
    });
  },
  viewForm: (req, res) => {
    res.render("criarCelular");
  },
  salvarForm: async (req, res) => {
    let celulares = await Celular.findAll();

    let { nome, preco } = req.body;
    let id = celulares[celulares.length - 1].id + 1;
    let img = `/images/${req.files[0].filename}`;

    // cria o obejto com os dados recebidos do FORM

    await db.query("INSERT INTO celulares VALUES (:id, :nome, :preco, :img)", {
      replacements: {
        id,
        nome,
        preco,
        img,
      },
      type: Sequelize.QueryTypes.INSERT,
    });

    // let celular = {
    //   id,
    //   nome,
    //   preco: Number(preco),
    //   img,
    // };

    // // ADICIONA O OBJETO AO JSON
    // celulares.push(celular);

    // // SALVAR O ARRAY DE CELULARES NO JSON
    // fs.writeFileSync(database, JSON.stringify(celulares));

    // // Redirecionar o usuário para a lista de celulares
    res.redirect("/celulares");
  },
  viewAttForm: async (req, res) => {
    let celulares = await Celular.findAll();

    let { id } = req.params;

    let celular = celulares.find((cel) => cel.id == id);

    res.render("editarCelular", { celular });
  },

  store: async (req, res) => {
    let { nome, preco } = req.body;
    let { id } = req.params;
    let img;

    const celular = await Celular.findByPk(id);

    // const [celular] = await db.query("SELECT * FROM celulares WHERE id = :id", {
    //   replacements: {
    //     id,
    //   },
    //   type: Sequelize.QueryTypes.SELECT,
    // });

    preco = preco || celular.preco;

    req.files[0]
      ? (img = `/images/${req.files[0].filename}`)
      : (img = celular.img);

    await db.query(
      "UPDATE celulares SET nome = :nome, preco = :preco, img = :img WHERE id = :id",
      {
        replacements: {
          nome,
          preco,
          img,
          id,
        },
        type: Sequelize.QueryTypes.UPDATE,
      }
    );

    // let celular = celulares.find((cel) => cel.id == id);
    // celular.nome = nome;
    // celular.preco = Number(preco);
    // celular.img = img;

    // fs.writeFileSync(database, JSON.stringify(celulares));

    res.redirect("/celulares");
  },

  destroy: async (req, res) => {
    let { id } = req.params;

    await db.query("DELETE FROM celulares WHERE id = :id", {
      replacements: { id },
      type: Sequelize.QueryTypes.DELETE,
    });

    // celulares.splice(
    //   celulares.findIndex((e) => e.id == id),
    //   1
    // );

    // fs.writeFileSync(database, JSON.stringify(celulares));

    res.redirect("/celulares");
  },
  // priceFilter: async (req, res) => {
  //   let { max, order = null } = req.query;

  //   let { page = 1 } = req.query;

  //   let { count: total, rows: celulares } = await Celular.findAndCountAll({
  //     limit: 5,
  //     offset: (page - 1) * 5,
  //     where: {
  //       preco: {
  //         [Sequelize.Op.lte]: max,
  //       },
  //     },
  //   });

  //   let totalPagina = Math.ceil(total / 5);
  //   console.log(total);

  //   // const celularesFiltrados = await db.query(
  //   //   "SELECT * FROM celulares WHERE preco <= :max",
  //   //   {
  //   //     replacements: { max },
  //   //     type: Sequelize.QueryTypes.SELECT,
  //   //   }
  //   // );

  //   // let celularesFiltrados = celulares.filter((celular) => celular.preco < max);

  //   res.render("listarCelulares", {
  //     usuario: req.session.usuario,
  //     celulares,
  //     totalPagina,
  //     order,
  //   });
  // },
  // class: async (req, res) => {
  //   let { minToMax, maxToMin, alfabetica } = req.query;
  //   let { page = 1 } = req.query;

  //   // let { count: total, rows: celulares } = await Celular.findAndCountAll({
  //   //   limit: 5,
  //   //   offset: (page - 1) * 5,
  //   // });

  //   // let totalPagina = Math.ceil(total / 5);
  //   console.log(total);
  //   // MÉTODO PARA CLASSIFICAR POR PREÇO

  //   if (minToMax) {
  //     let { count: total, rows: celulares } = await Celular.findAndCountAll({
  //       limit: 5,
  //       offset: (page - 1) * 5,
  //       order: [["preco", "ASC"]],
  //     });
  //     let totalPagina = Math.ceil(total / 5);
  //     console.log(total);

  //     // let result = celulares.sort((a, b) => a.preco - b.preco);

  //     res.render("listarCelulares", {
  //       usuario: req.session.usuario,
  //       celulares,
  //       totalPagina,
  //     });
  //   } else if (maxToMin) {
  //     let { count: total, rows: celulares } = await Celular.findAndCountAll({
  //       limit: 5,
  //       offset: (page - 1) * 5,
  //       order: [["preco", "DESC"]],
  //     });
  //     let totalPagina = Math.ceil(total / 5);
  //     console.log(total);

  //     // let result = celulares.sort((a, b) => b.preco - a.preco);
  //     res.render("listarCelulares", {
  //       usuario: req.session.usuario,
  //       celulares,
  //       totalPagina,
  //     });
  //   } else if (alfabetica) {
  //     let { count: total, rows: celulares } = await Celular.findAndCountAll({
  //       limit: 5,
  //       offset: (page - 1) * 5,
  //       order: [["nome", "ASC"]],
  //     });
  //     let totalPagina = Math.ceil(total / 5);
  //     console.log(total);
  //     // let result = celulares.sort((a, b) => a.nome.localeCompare(b.nome));
  //     res.render("listarCelulares", {
  //       usuario: req.session.usuario,
  //       celulares,
  //       totalPagina,
  //     });
  //   } else {
  //     let { count: total, rows: celulares } = await Celular.findAndCountAll({
  //       limit: 5,
  //       offset: (page - 1) * 5,
  //     });

  //     let totalPagina = Math.ceil(total / 5);
  //     console.log(total);
  //     return res.render("listarCelulares", {
  //       usuario: req.session.usuario,
  //       celulares,
  //       totalPagina,
  //     });
  //   }
  // },
  detalhe: async (req, res) => {
    let { id } = req.params;

    let celular = await Celular.findByPk(id);

    res.render("detalhes", { celular });
  },
  search: async (req, res) => {
    let { key, max = 200000, order = "id-asc", page = 1 } = req.query;

    let classify = order.split("-");

    let { count: total, rows: celulares } = await Celular.findAndCountAll({
      limit: 5,
      offset: (page - 1) * 5,
      where: {
        preco: {
          [Sequelize.Op.lte]: max,
        },
        nome: {
          [Sequelize.Op.like]: `%${key}%`,
        },
      },
      order: [classify],
    });

    let totalPagina = Math.ceil(total / 5);
    console.log(total);

    // let celulares = await Celular.findAll({
    //   where: {
    //     nome: {
    //       [Sequelize.Op.like]: `%${key}%`,
    //     },
    //   },
    // });
    // return res.send(celulares);
    res.render("listarCelulares", {
      max,
      celulares,
      usuario: req.session.usuario,
      totalPagina,
      order,
      key,
    });
  },
};
