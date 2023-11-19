const router = require("express").Router()
const multer = require('multer');
const {  uploadImage } = require("../controllers/ocrControllers");
const errorHandler = require("../utils/error");

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  const imageFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new errorHandler('Only images are allowed!'), false);
    }
  };
const upload = multer({ storage: storage, array: true, fileFilter: imageFileFilter, })

const cpUpload = upload.array('files')
router.post('/uploadImage',cpUpload,uploadImage)

module.exports = router;