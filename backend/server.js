const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();
const firebase = require('./firebase.js')
const bucket = firebase.bucket
const { uploadFile } = require('./service/files.service.js')
const { authenticate } = require('./middleware/auth.js')

const port = process.env.PORT || 8080;

const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage()
});

app.use(cors({origin: process.env.CLIENT_URL}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/upload', [upload.single('file'), authenticate], async (req, res) => {
    try {
        if (!req.user.auth) {
            throw new Error("Unauthorized")
        }
        const url = await uploadFile(req.file)
        console.log(url)
        res.send("OK")
    } catch(err) {
        console.log(err)
        res.status(400).send(err)
    }
});

app.get("/upload/:filepath", async (req, res) => {
    const blob = await bucket.file(req.params.filepath)
    const filedata = await blob.download()
    
    res.send(filedata[0])
})

app.delete('/upload/:filepath', (req, res) => {
    bucket.file(req.params.filepath).delete()
    .then(() => {
      console.log('File deleted successfully');
      res.send("ok")
    })
    .catch((error) => {
      console.error('Error deleting file:', error);
      res.status(400).send("error")
    });
})


app.listen(port, () => {
  console.log(`Backend is now running on port ${port}!`);
});
