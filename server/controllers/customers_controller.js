module.exports = {
    getAll: (req, res, next) => {
        app.get('db').customers_return_all()
        .then(customers => {
            res.status(200).send(customers)
        })
    }
}