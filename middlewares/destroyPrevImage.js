import cloudinary from 'cloudinary'

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "dfmdacf6w",
  api_key: "242969794617587",
  api_secret: "Dm7ZfI-wru-g75QJslj_JNOpw2I",
});

export const deletePrevImage = async (req, res) => {
    try {
      const result = await cloudinary.uploader.destroy(req.body.public_id);
      console.log(result)
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: 'Failed to delete image' });
    }
  };