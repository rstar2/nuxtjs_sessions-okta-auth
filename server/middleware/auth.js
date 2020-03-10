import express from 'express';
import bodyParser from 'body-parser';

const consola = require('consola');

// Create express router
const router = express.Router();

// register only for this middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.post('/register', (req, res) => {
  consola.info('Server middleware auth - register');

  const { name, password } = req.body;

  req.session.user = { name, password };

  res.redirect('/');
});

router.post('/login', (req, res) => {
  consola.info('Server middleware auth - login');

  const { name, password } = req.body;

  req.session.user = { name, password };

  // res.status(200).send({ success: true });
  res.redirect('/');
});

router.post('/logout', (req, res) => {
  // const { body } = req;

  const count = req.session.count || 0;
  req.session.count = count + 1;

  res.status(200).send({ success: true, count });
});

// Export the server middleware
export default {
  path: '/auth',
  handler: router
};
