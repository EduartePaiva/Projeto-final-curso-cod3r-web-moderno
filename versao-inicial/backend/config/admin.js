//no caso o middleware aqui é a proxima request a fazer
module.exports = (middleware) => {
    return (req, res, next) => {
        if (req.user.admin) {
            middleware(req, res, next)
        } else {
            res.status(401).send('Usuário não é administrador')
        }
    }
}