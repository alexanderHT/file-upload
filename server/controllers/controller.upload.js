const multer = require('multer')
const Item = require('../models/mode.item')

module.exports = {
  // upload method
  upload: function (req, res) {

    console.log(req.body);
    console.log('=============');
    console.log(req.file);

  //   var imageFile = req.files[0].originalname
  //
  //   var item = new Item({
  //     itemName: req.body.itemName,
  //     photobarang: imageName
  //   })
  //
  //   Item.save(function (err, data) {
  //     if (err)throw err
  //     console.log(data);
  //   })
  }
  // end
}
