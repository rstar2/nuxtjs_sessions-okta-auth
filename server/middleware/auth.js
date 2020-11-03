import express from 'express';
import bodyParser from 'body-parser';

const consola = require('consola');

const db = require('../db');

// Create express router
const router = express.Router();

// register only for this middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true, parameterLimit: 5 }));

function login(req, res, next, isRegister = false) {
  const { email, password } = req.body;

  // if already logged-in
  if (req.session.user) {
    consola.info('Server middleware auth - already logged in user');
    res.redirect('/');
    return;
  }

  const action = isRegister ? db.register(email, password) : db.login(email, password);
  action
    .then((user) => {
      consola.info(`Server middleware auth - newly ${isRegister ? 'registered' : 'logged in'} user`);
      // store the newly registered or logined user into the session (nuxt-session) 
      req.session.user = user;

      // res.status(200).send({ success: true });
      res.redirect('/');
    })
    .catch((err) => next(err));
}

router.post('/register', (req, res, next) => {
  consola.info('Server middleware auth - register');

  login(req, res, next, true);
});

router.post('/login', (req, res, next) => {
  consola.info('Server middleware auth - login');

  login(req, res, next);
});

router.post('/logout', (req, res, next) => {
  consola.info('Server middleware auth - logout');

  // delete session object
  req.session.destroy(function(err) {
    if (err) {
      return next(err);
    }
    consola.info('Server middleware auth - logged out user');
    return res.redirect('/');
  });
});

// Export the server middleware
export default {
  path: '/auth',
  handler: router
};
