const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require('multer')
const fs = require('fs')
const File = require('../models/file')

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

// Endpoint
router.post("/api/upload-file", async (req, res) => {
  const upload = multer({ storage }).single('image')
  upload(req, res, (err) => {
    if (err) {
      res.send(err)
      return
    }

    const imageFormats = ["jpg","jpeg","gif"]
    const extension = req.file.filename.split(".")[1]
    let configObj

    if (imageFormats.includes(extension)) {
      configObj = {
        use_filename: true,
        resource_type: "image",
        overwrite: true,
      }
    } else {
      configObj = {
        width: 720, 
        height: 1280,
        use_filename: true,
        resource_type: "video",
        overwrite: true,
      }
    }

    const filepath = `${req.file.destination}/${req.file.filename}`

    cloudinary.uploader.upload(
      filepath,
      configObj,
      async (error, result) => {
        if (error) {
          res.send(error)
          return
        }
        
        const file = new File({
          name: result.original_filename, 
          url: result.url,
          public_id: result.public_id,
          format: result.format,
        });

        const savedFile = await file.save();
        
        fs.unlink(filepath, (err) => {
          if(err) {
            console.error(err)
          } else {
            res.send(savedFile)
          }
        })
      }
    );
  })
});

router.post('/api/delete-file', async (req, res) => {
  const fileId = req.body.id ? req.body.id : req.body._id
  const deletedFile = await File.findByIdAndRemove(fileId)
  let resource_type

  if (deletedFile.format == "mp4") {
    resource_type = "video"
  } else {
    resource_type = "image"
  }

  await cloudinary.uploader.destroy(deletedFile.public_id, {
    invalidate: true,
    resource_type,
  });
  res.send(deletedFile)
})

module.exports = router;
