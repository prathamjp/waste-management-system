const router = require("express").Router();
const imageController = require("../controllers/upload.controller");

router.get("/", imageController.fetchAllImages);

router.post(
  "/upload",
  imageController.uploadMulter,
  imageController.uploadImageToImageKit
);


module.exports = router;
