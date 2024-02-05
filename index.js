const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();
const {encodeFile, decodeFile} = require("./huffmanCoding");

app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  if(req.file.mimetype === "text/plain"){
    encodeFile(req.file.path);
  }
  else if(req.file.mimetype === "application/octet-stream"){
    decodeFile(req.file.path);
  }
  res.json({
    name: req.file.name,
    type : req.file.mimetype,
    size: req.file.size
  }); 
});

app.listen(3000, (req,res) =>{
  console.log("Your app is listening on port " + 3000);
});
