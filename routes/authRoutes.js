const Authentication = require('../controllers/authentication');
require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
    app.get('/', requireAuth, function (req, res) {
        res.send({ hi: 'there' });
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    app.get('/users/current/:token', Authentication.getCurrentUser);
    app.post('/users/update', Authentication.update);
    app.get('/games/new', Authentication.createGame);
    app.get('/games/:id', Authentication.getGame);
}