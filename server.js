// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuidv1 = require('uuid/v1');

const fs = require("fs");

// Aplicatia
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Create
app.post("/images", (req, res) => {
  const imagesList = readJSONFile();
  const newImage = req.body;
  newImage.id = uuidv1();
  const newImageList = [...imagesList, newImage];
  writeJSONFile(newImageList);
  res.json(newImage);
});

// Read One
app.get("/images/:id", (req, res) => {
  const imagesList = readJSONFile();
  const id = req.params.id;
  let idFound = false;
  let foundImage;

  imagesList.forEach(image => {
    if (id === image.id) {
      idFound = true;
      foundImage = image
    }
  });

  if (idFound) {
    res.json(foundImage);
  } else {
    res.status(404).send(`Image ${id} was not found`);
  }
});

// Read All
app.get("/images", (req, res) => {
  const imagesList = readJSONFile();
  res.json(imagesList);
});

// Update
app.put("/images/:id", (req, res) => {
  const imagesList = readJSONFile();
  const id = req.params.id;
  const newImage = req.body;
  newImage.id = id;
  idFound = false;

  const newImagesList = imagesList.map((image) => {
     if (image.id === id) {
       idFound = true;
       return newImage
     }
    return image
  })
  
  writeJSONFile(newImagesList);

  if (idFound) {
    res.json(newImage);
  } else {
    res.status(404).send(`Image ${id} was not found`);
  }

});

// Delete
app.delete("/images/:id", (req, res) => {
  const imagesList = readJSONFile();
  const id = req.params.id;
  const newImagesList = imagesList.filter((image) => image.id !== id)

  if (imagesList.length !== newImagesList.length) {
    res.status(200).send(`Image ${id} was removed`);
    writeJSONFile(newImagesList);
  } else {
    res.status(404).send(`Image ${id} was not found`);
  }
});

// Functia de citire din fisierul images.json
function readJSONFile() {
  return JSON.parse(fs.readFileSync("images.json"))["images"];
}

// Functia de scriere in fisierul images.json
function writeJSONFile(content) {
  fs.writeFileSync(
    "images.json",
    JSON.stringify({ images: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// Pornim server-ul
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);