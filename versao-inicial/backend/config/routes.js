const admin = require('./admin')

module.exports = (app) => {
	//rotas de autenticação
	app.post('/signup', app.api.user.save)
	app.post('/signin', app.api.auth.signin)
	app.post('/signout', app.api.auth.signout) //vou fazer isto
	app.post('/validateToken', app.api.auth.validateToken)



	//rotas usuários
	app.route("/users")
		.all(app.config.passport)
		.post(admin(app.api.user.save))
		.get(admin(app.api.user.get))

	app.route("/users/:id")
		.all(app.config.passport)
		.put(admin(app.api.user.save))
		.get(admin(app.api.user.getById))
		.delete(admin(app.api.user.remove))


	//rotas categorias

	app.route("/categories")
		.all(app.config.passport)
		.get(admin(app.api.category.get))
		.post(admin(app.api.category.save))

	// Cuidado com ordem! tem que vir antes de /categories/:id
	app.route("/categories/tree")
		.all(app.config.passport)
		.get(app.api.category.getTree)

	app.route("/categories/:id")
		.all(app.config.passport)
		.get(app.api.category.getById)
		.put(admin(app.api.category.save))
		.delete(admin(app.api.category.remove))

	app.route('/articles')
		.all(app.config.passport)
		.get(admin(app.api.article.get))
		.post(admin(app.api.article.save))

	app.route('/articles/:id')
		.all(app.config.passport)
		.get(app.api.article.getById)
		.put(admin(app.api.article.save))
		.delete(admin(app.api.article.remove))

	app.route('/categories/:id/articles')
		.all(app.config.passport)
		.get(app.api.article.getByCategory)

	app.route('/stats')
		.all(app.config.passport)
		.get(app.api.stat.get)

}
