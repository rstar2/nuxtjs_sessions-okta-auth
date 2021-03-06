import express from 'express';
import bodyParser from 'body-parser';

// Create express router
const router = express.Router();

// register only for this middleware
router.use(bodyParser.json());

router.use('/test', (req, res) => {
  // const { body } = req;

  const count = req.session.count || 0;
  req.session.count = count + 1;

  res.status(200).send({ success: true, count });
});

// Export the server middleware
export default {
  path: '/api',
  handler: router
};
