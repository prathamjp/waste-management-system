const multer = require("multer");
const imagekit = require("../utils/image-kit");
const Image = require("../models/images.model");

var multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
});

const uploadMulter = upload.single("file");

const fetchAllImages = async (req, res) => {
  const images = await Image.find();
  console.log(images);

  res.status(200).json({
    data: images,
  });
};

const uploadImageToImageKit = async (req, res) => {
  // console.log(req);s
  const file = req.file;
  console.log(file);
  const data = req.body.data;
  console.log(data);

  if (!file) {
    return res.status(400).json({
      message: "Please upload an image",
    });
  }

  const uploadResponse = await imagekit.upload({
    file: file.buffer,
    fileName: file.originalname,
    folder: "uploads",
    isPrivateFile: false,
  });

  if (data > 0.9) {
    const newImage = await Image.create({
      fileName: uploadResponse.name,
      imageUrl: uploadResponse.url,
    });
    res.status(201).json({
      message: "Image uploaded successfully",
      data: newImage,
    });
  } else {
    res.status(201).json({
      message: "Clean Image was not uploaded",
    });
  }
};



module.exports = {
  uploadMulter,
  uploadImageToImageKit,
  fetchAllImages,
};
