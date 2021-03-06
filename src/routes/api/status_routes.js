/**
 * API Status Routes
 */
const AuthHandler = require('../../handlers/auth_handler.js');
const RequestAuthenticator = require('../middleware/auth_middleware.js');

module.exports = function(app, config, routes) {
	const requestAuthenticator = RequestAuthenticator(new AuthHandler(config));

	/* Public test route - w/o CSURF */
	routes.unprotected.get('/status', function(req, res) {
		return res.status(200).json({"200":"OK."});
	});

	/* Public test route - w/ CSURF */
	routes.protected.post('/test/csrf', function(req, res) {
		return res.status(200).json({"200":"OK."});
	});

	/* Private test route - w/o CSURF */
	routes.unprotected.post('/test/auth', requestAuthenticator, function(req, res) {
		return res.status(200).json({"200":"Authenticated."});
	});

	
	/* Private test route - w CSURF */
	routes.protected.post('/test/auth_csrf', requestAuthenticator, function(req, res) {
		return res.status(200).json({"200":"Authenticated."});
	});

}