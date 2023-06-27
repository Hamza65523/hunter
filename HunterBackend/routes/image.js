
const express = require("express");
const router = express.Router();
const controller = require('../Controllers/upload')
const upload = require('../multerConfig')



// router.post('/singleimg', upload.single('images'),controller.uploadSingleImage)
router.post('/multiimg',upload.array('images', 12),controller.uploadMultipleImage)
router.get('/',controller.getImages)


module.exports = router;
