var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var methodOverride = require("method-override");
var session = require("express-session");

var indexRouter = require("./routes/routes"); // MIDDLEWARE DE ROTEAMENTO
var log = require("./middlewares/logSite"); // AULA MIDDLEWARE CRIADO A NÍVEL DE APLICAÇÃO
var cookieLogin = require("./middlewares/cookieLogin"); // AULA MIDDLEWARE CRIADO A NÍVEL DE APLICAÇÃO

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "projetoCelulares",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); // GARANTE QUE A PASTA PUBLIC SERÁ ACESSAR
app.use(methodOverride("_method")); //MIDDLEWARE PARA O USO DE METHOD OVERRIDE, REQUISIÇÕES PUT E DELETE
app.use(cookieLogin);
app.use(log.logSite); // AULA MIDDLEWARE CRIADO A NÍVEL DE APLICAÇÃO

app.use("/", indexRouter); // MIDDLEWARE DE ROTEAMENTO

app.use((req, res, next) => {
  res.status(404).render("not-found"); // MIDDLEWARE PARA O TRATAMENTO DO ERRO 404
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get("env") === "development" ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render("error");
// });

module.exports = app;
