const multer = require("multer");
const path = require("path");

let img = path.join("public", "images");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, img);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});

module.exports = multer({ storage });