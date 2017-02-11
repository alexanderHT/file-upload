# Tutorial file upload (need to test first)

# Client side
```
1. markup language
===================
<form class="form-horizontal" id="createdItem" enctype="multipart/form-data">
  <div class="form-group">
    <label class="col-sm-3">Name</label>
    <div class="col-sm-9">
      <input type="text" name="name" value="name" required>
    </div>
  </div>
  <div class="form-group" method="post">
    <label class="col-sm-3">Price</label>
    <div class="col-sm-9">
      <input type="text" name="price" value="price" required>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-3">Stock</label>
    <div class="col-sm-9">
      <input type="text" name="stock" value="stock" required>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-9">File input</label>
    <input type="file" name="picture">
  </div>
  <div class="modal-footer">
    <div class="form-group">
      <button type="submit" class="btn btn-primary">Add Item</button>
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
    </div>
  </div>
</form>


2. javascript and jquery language
===================================
$('form#createdItem').submit(function(e){
  var formData = new FormData($('form#createdItem')[0]);
  e.preventDefault()
  let name = $('input[name=name]').val()
  let stock = $('input[name=stock]').val()
  let price = $('input[name=price]').val()
  let picture = $('input[name=picture]').val()
  $.ajax({
    url: 'http://localhost:3000/api/items',
    type: 'POST',
    data: formData,
    dataType: 'json',
    contentType: false,
    processData: false,
    success: function(status) {
      console.log(status);
    }
  }).done(function(){
    $('#addNewItem').modal('hide');
    $('input[name=name]').val("name");
    $('input[name=stock]').val("stock");
    $('input[name=price]').val("price");
    $('input[name=picture]').val("");
    listAllItem();
  })
})
```

# Server side | app.js
```
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })
```

# Server side | controller
```
create : function(req, res){
    im.resize({
      srcPath: req.file.path,
      dstPath: req.file.path,
      width: 360,
    }, function(err, stdout, stderr){
      if (err) throw err;
    });
    let data = {
      name : req.body.name,
      picture : req.file.originalname,
      stock: req.body.stock,
      price: req.body.price
    }
    let newitems = items(data)
    newitems.save(function(err){
      if(err) throw err;
      res.send({
        msg: 'item Created!',
        item: newitems
      })
    })
  }
```
