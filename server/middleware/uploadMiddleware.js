import multer from "multer";
import path from "path";

/* Storage config */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/cars");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${file.originalname.replace(/\s+/g, "")}`
    );
  },
});

/* File filter */
function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
    cb(null, true);
  } else {
    cb(new Error("Images only"));
  }
}

const upload = multer({ storage, fileFilter });

export default upload;
