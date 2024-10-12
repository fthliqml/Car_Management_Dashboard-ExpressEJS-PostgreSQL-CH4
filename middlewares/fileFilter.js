const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["image/png", "image/jpeg"];
    if (allowedMimeTypes.includes(file.mimetype)) {
        // accept file
        cb(null, true);
    } else {
        // create error, reject file
        cb(new Error("File Not Allowed"), false);
    }
};

const upload = multer({
    fileFilter,
});

module.exports = upload;
