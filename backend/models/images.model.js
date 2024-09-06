const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: [true, "Please provide a file name"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide an image URL"],
  },

    // location: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // result: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
});

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
