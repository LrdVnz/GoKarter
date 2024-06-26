const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dogunqggs",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


function setOptions(folderName) {
  const options = {
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: folderName,
    },
  }),
}
return options
};

const uploadAvatar = multer(setOptions("avatar")).single("avatar");
const uploadCover = multer(setOptions("cover")).single("cover");


module.exports = { 
  uploadAvatar: uploadAvatar,
  uploadCover : uploadCover
}; 
