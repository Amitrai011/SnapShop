import multer from "multer";
import path from "path";
import { Router } from "express";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.text(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  console.log("req.file: ", req.file);
  res.send({
    message: "Image uploaded",
    image: `/${req.file.path}`,
  });
  s;
});

export default router;
