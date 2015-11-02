var express = require('express');
var router = express.Router();
var net = require('net');

var clientScktController= require('../controllers/ClientSocket.js');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'TrenesPi2' });

});

router.get('/comando',clientScktController.question);
router.get('/answer',clientScktController.answer);
module.exports = router;
