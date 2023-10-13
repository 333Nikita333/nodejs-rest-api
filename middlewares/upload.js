const multer = require("multer");
const path = require("path");
const { HttpError } = require("../helpers");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (_, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const newName = `${uniquePrefix}_${file.originalname}`;
    cb(null, newName);
  },
});

const limits = {
  fileSize: 1024 * 1024,
};

const fileFilter = (_, file, cb) => {
  const { mimetype } = file;
  if (mimetype === "image/jpeg" || mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new HttpError(400, "File can have only .jpeg or .png extension"), false);
  }
};
const upload = multer({
  storage: multerConfig,
  limits,
  fileFilter,
});

module.exports = upload;
