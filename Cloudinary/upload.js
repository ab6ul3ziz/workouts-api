const cloudinary = require("../Cloudinary/cloudinary");

const uploadImages = async (images) => {
  const secures = [];
  for (const image in images) {
    const result = await cloudinary.uploader.upload(images[image]);

    secures.push({ imgID: result.public_id, url: result.secure_url });
  }

  return secures;
};

module.exports = {
  uploadImages,
};
