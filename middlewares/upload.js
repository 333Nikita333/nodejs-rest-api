//! A new way to save avatars
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatars",
    allowed_formats: ["jpg", "png"],
    transformation: [
      {
        width: 250,
        height: 250,
        crop: "fill",
        quality: "60",
      },
    ],
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
});

module.exports = upload;

//! The old way to save avatars
// const multer = require("multer");
// const path = require("path");
// const { HttpError } = require("../helpers");

// const tempDir = path.join(__dirname, "../", "tmp");

// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (_, file, cb) => {
//     const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const newName = `${uniquePrefix}_${file.originalname}`;
//     cb(null, newName);
//   },
// });

// const limits = {
//   fileSize: 1024 * 1024,
// };

// const fileFilter = (_, file, cb) => {
//   const { mimetype } = file;
//   if (mimetype === "image/jpeg" || mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(new HttpError(400, "File can have only .jpeg or .png extension"), false);
//   }
// };
// const upload = multer({
//   storage: multerConfig,
//   limits,
//   fileFilter,
// });

// module.exports = upload;
