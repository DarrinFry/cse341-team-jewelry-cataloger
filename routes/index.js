const routes = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// Landing page for all guests
routes.get('/', ensureGuest, (req,res) => {
    let html = '<h1>Jewelry Cataloger API Login</h1>';
    html += '<p>Log in with your Google Account to see the api-docs.</p>';
    html += `<button onclick="window.location.href='/auth/google';">Log In</button>`;
    res.send(html);
})

routes.use('/api-docs', ensureAuth, require('./swagger'));
routes.use('/user', ensureAuth, require('./user'));
routes.use('/insurance', ensureAuth, require('./insurance'));
routes.use('/jewelry', ensureAuth, require('./jewelry'));
routes.use('/market', ensureAuth, require('./market'));
routes.use('/auth', require('./auth'));

// routes.get('/', (req, res) => {
// 	res.render('index', {
// 		title: 'Welcome to Jewelry Cataloger',
// 		//   isAuthenticated: req.oidc.isAuthenticated(),
// 	});
// });

module.exports = routes;
