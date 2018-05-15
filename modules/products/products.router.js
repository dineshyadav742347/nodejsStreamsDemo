const router = require('express').Router();
const productCtrl = require('./products.controller');
const logger = require('../../logger');
const JSONStream = require('JSONStream');

router.get('/', (req, res) => {
  try {
    productCtrl.fetchProducts((err, result) => {
      if (err) {
        logger.error('Error ', err);
        return res.status(400).send({ error: 'Something is wrong, please try later..!' })
      } else {
        return res.send(result);
      }
    });
  } catch (err) {
    logger.error('Uncaught error ', err);
    return res.status(500).send({ error: 'Unexpected error, please try later...!' });
  }
});

router.post('/stream', (req, res) => {
  try {
    res.send({message: `Received ${req.body.length} objets`});
  } catch (err) {
    logger.error('Uncaught error ', err);
    return res.status(500).send({ error: 'Unexpected error, please try later...!' });
  }
});

router.get('/stream', (req, res) => {
  try {
    productCtrl.fetchProductsAsStream(res);
  } catch (err) {
    logger.error('Uncaught error ', err);
    return res.status(500).send({ error: 'Unexpected error, please try later...!' });
  }
});

router.get('/rawdata/stream', (req, res) => {
  try {
    productCtrl.fetchProductsFromFileAsStream(res);
  } catch (err) {
    logger.error('Uncaught error ', err);
    return res.status(500).send({ error: 'Unexpected error, please try later...!' });
  }
});

module.exports = router;