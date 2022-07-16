const routes = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

routes.use('/api-docs', ensureAuth, require('./swagger'));
routes.use('/user', ensureAuth, require('./user'));
routes.use('/insurance', ensureAuth, require('./insurance'));
routes.use('/jewelry', ensureAuth, require('./jewelry'));
routes.use('/market', ensureAuth, require('./market'));
routes.use('/auth', require('./auth'));

// Landing page for guests
routes.get('/', ensureGuest, (req, res) => {
	res.render('index', {
		title: 'Welcome to Jewelry Cataloger',
		//   isAuthenticated: req.oidc.isAuthenticated(),
	});
});

module.exports = routes;
