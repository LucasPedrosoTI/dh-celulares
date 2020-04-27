function auth(req, res, next) {
    if (typeof req.session.usuario != "undefined") {
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = auth;