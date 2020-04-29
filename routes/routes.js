var express = require("express");
var router = express.Router();
const upload = require("../lib/upload");
const log = require("../middlewares/logSite");
const { check, validationResult, body } = require("express-validator");
const users = require("../database/admin.json");
const auth = require("../middlewares/auth");

const estudanteController = require("../controllers/estudanteController");
const celularController = require("../controllers/celularController");
const admController = require("../controllers/admController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/celulares");
});

router.get("/estudantes", estudanteController.index);

router.get("/contato", estudanteController.viewContato);
router.get("/confirmarcontato", estudanteController.confirmarContato);

router.get("/celulares", celularController.listarCelulares);
// router.get("/celulares/filtro", celularController.priceFilter);
// router.get("/celulares/class", celularController.class);
router.get("/celulares/search", celularController.search);

router.get("/celulares/criar", celularController.viewForm);
router.post(
  "/celulares/criar",
  [check("nome").isLength({ min: 1 }).withMessage("Deve conter um nome")],
  upload.any(),
  log.logDB,
  celularController.salvarForm
);
router.get("/celulares/:id/editar", celularController.viewAttForm);

router.put(
  "/celulares/:id/editar",
  [check("nome").isLength({ min: 1 }).withMessage("Deve conter um nome")],
  upload.any(),
  celularController.store
);
router.delete("/celulares/deletar/:id", celularController.destroy);

router.get("/celulares/:id", celularController.detalhe);

router.get("/login", admController.login);
router.post("/login", admController.entrar);

router.get("/signup", admController.signup);
router.post(
  "/signup",
  [
    check("username")
      .isLength({ min: 3 })
      .withMessage("O username deve ser no minimo 3 caracteres"),
    check("senha")
      .isLength({ min: 6 })
      .withMessage("senha deve ser no minimo 6 caracteres"),
  ],
  admController.cadastrar
);

module.exports = router;
