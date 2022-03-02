const path = require('path');
const express = require('express');
const multer = require('multer');
const File = require('../models/file');
const Router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 7340032 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    // Dropzone filter file type so disable this filter
    if (!file.originalname.match(/\.(jpeg|jpg|png|gif|pdf)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, gif format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

Router.post(
  '/upload',
  upload.single('file'),
  async (req, res) => {
    try {
      //const { title, description } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        // title,
        // description,
        file_path: path,
        file_mimetype: mimetype
      });
      await file.save();
      //res.send('file uploaded successfully.');
      res.status(200).send({file_path: path});
    } catch (error) {
      console.log(error)
      res.status(400).send('Error while uploading file. Try again later.');

    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.get('/getAllFiles', async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

// Router.get('/download/:id', async (req, res) => {
//   console.log("download is called")
//   try {
//     const file = await File.findById(req.params.id);
//     res.set({
//       'Content-Type': file.file_mimetype
//     });
//     res.sendFile(path.join(__dirname, '..', file.file_path));
//   } catch (error) {
//     res.status(400).send('Error while downloading file. Try again later.');
//   }
// });

Router.get('/download/:filename', async (req, res) => {
  try {
    //req.params.filename = "1641973609591_2021-12-04_040122.png"
    const file = await File.findOne({file_path: 'files\\' + req.params.filename});
    console.log(file)
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', '..', file.file_path));
  } catch (error) {
    res.status(400).send('ファイルのダウンロード中にエラーが発生しました。 あとでもう一度試してみてください。');
  }
});

module.exports = Router;



