import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";

export const createPost = async (req, res, next) => {
    try {
        const {userId, picturePath, description} = req.body;
        const user = await UserModel.findById(userId)
        const newPost = new PostModel({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save()

        const posts = await PostModel.find()
        res.status(201).json(posts)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

