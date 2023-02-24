import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";

export const createPost = async (req, res, next) => {
    try {
        const { userId, picturePath, description } = req.body;
        // const user = await UserModel.findById(userId)
        const newPost = new PostModel({
            userId,

            description,
            picturePath,
            likes: {},
            comments: []
        })
        const post = await newPost.save()

        console.log(post)


        res.status(201).json(post)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

