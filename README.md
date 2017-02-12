# file-upload

image file upload using multer and jquery

# client side
```
1. HTML ( in index.html file we create a form )

<form  enctype="multipart/form-data" method="post" id="upload-form">
  <p><input type="text" name="title"></p>
  <p><input type="file" name="upl"></p>
  <p><input type="submit" value="upload"></p>
</form>


2. Javascript ( add script below, and don't forget to embed jquery )

$('#upload-form').submit(function(e){

  var formData = new FormData($('#upload-form')[0]);
  console.log(formData);
  e.preventDefault() // went you click submit button it will go to another page (refresh page or something so we need to prevent it by using this code
  $.ajax({
    url: 'http://localhost:3000/upload',
    type: 'POST',
    data: formData,
    dataType: 'json',
    contentType: false,
    processData: false,
    success: function(status) {
      console.log(status);
    }
  }).done(function(){
    console.log("success upload");
  })

})

```

# server side

## app.js ( you must download package multer )
```
// add this code below in app.js
var multer  = require('multer')
var path = require('path');
```

## routes | index.js
```
var express = require('express');
var router = express.Router();
var controllerUpload = require('../controllers/controller.upload');
var multer  = require('multer')
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// add multer to your router as a middlewhere
router.post('/upload', multer({ dest: './uploads/' }).single('upl'), controllerUpload.upload);

module.exports = router;
```

## controllers | controller.upload.js
```
const multer = require('multer')
const Item = require('../models/mode.item')

module.exports = {
  // upload method
  upload: function (req, res) {

    console.log(req.body);
    console.log('=============');
    console.log(req.file);
  }
}
```
