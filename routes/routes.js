var express = require("express");
var router = express.Router();
const upload = require("../lib/upload");

const estudanteController = require("../controllers/estudanteController");
const celularController = require("../controllers/celularController");
const admController = require("../controllers/admController");

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
});

router.get("/estudantes", estudanteController.index);

router.get("/contato", estudanteController.viewContato);
router.get("/confirmarcontato", estudanteController.confirmarContato);

router.get("/celulares", celularController.listarCelulares);
router.get("/celulares/filtro", celularController.priceFilter);
router.get("/celulares/class", celularController.class);

router.get("/celulares/criar", celularController.viewForm);
router.post("/celulares/criar", upload.any(), celularController.salvarForm);
router.get("/celulares/:id/editar", celularController.viewAttForm);
router.put("/celulares/:id/editar", upload.any(), celularController.store);
router.delete("/celulares/deletar/:id", celularController.destroy);
router.get("/celulares/ver", celularController.ver);

router.get("/login", admController.login);
router.post("/login", admController.entrar);

router.get("/signup", admController.signup);
router.post("/signup", admController.cadastrar);

module.exports = router;