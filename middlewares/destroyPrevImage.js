import cloudinary from 'cloudinary'

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
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