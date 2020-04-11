module.exports = {
    index: (req, res) => {
        res.render('estudantes')
    },
    viewContato: (req, res) => {
        let { nome, idade } = req.query;
        res.render('contato', { nomeUsuario: nome });
    },
    confirmarContato: (req, res) => {
        let { nome, email } = req.query;
        res.send(`Nome ${nome}
       \n Email: ${email}`)
    },
}