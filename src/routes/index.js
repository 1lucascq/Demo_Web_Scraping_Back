const express = require('express');
const Controller = require('../controllers')

const router = express.Router();

router.get('/geladeira', Controller.getData);
router.get('/celular', Controller.getData);
router.get('/tv', Controller.getData);

module.exports = router;