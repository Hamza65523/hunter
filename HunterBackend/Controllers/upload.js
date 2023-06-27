
const path = require('path')
const fs = require('fs')
const NodeCache = require( "node-cache" ); 
const myCache = new NodeCache();

exports.uploadSingleImage= function (req, res, next) {
  if (!req.file) {
    return res.status(400).json({ error: 'No image were uploaded.' });
  }
  return  res.status(200).send({Image:req.file.path.replace(/\\/g, '/'),status:true,message:'Image uploaded successfully.'});
}


exports.uploadMultipleImage=async(req, res) => {
  
  // Process the uploaded files
  if (!req.files ||req.files.length ==0) {
    return res.status(400).json({ error: 'No image were uploaded.' });
  }
    const uploadedFiles = req.files.map((file) => {
      return {path: file.path.replace(/\\/g, '/')}
    });
    res.send({ files: uploadedFiles });
  }

  // Route to get all uploaded images
exports.getImages = (req, res) => {
  const directoryPath = path.join(__dirname, '..', 'uploads')
  //   obj = { name: "Alexander", age: 42 };
  // data = myCache.set( "images", obj, 20000 ); 
  // Read the directory and retrieve the list of files
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve images.' });
    }

    // Map the list of files to their absolute paths
    const imagePaths = files.map((file) => `uploads/${file}`);

    // Send the list of image paths as a JSON response
    res.status(200).json({ images: imagePaths });
  });
}