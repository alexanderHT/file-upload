var express = require('express');
var router = express.Router();
var controllerUpload = require('../controllers/controller.upload');
var multer  = require('multer')
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/upload', multer({ dest: './uploads/' }).single('upl'), controllerUpload.upload);

module.exports = router;
