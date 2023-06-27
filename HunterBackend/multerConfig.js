const path = require('path')
var multer = require('multer');
const fs = require('fs')
//multer.diskStorage() creates a storage space for storing files.
if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

var storage = multer.diskStorage({
destination:function(req, file,cb){
if(file.mimetype === 'image/jpeg'||file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
cb(null, './uploads');
}else{
cb({message: 'this file is neither a image file'}, false)
}
},
filename: function(req, file, cb){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
}
})
var upload = multer({storage:storage});
module.exports = upload;