import PostModel from "../models/post.model.js"

export const feedPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find()
        res.status(200).json(posts)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const userPosts = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const posts = await PostModel.find({userId})
        res.status(200).json(posts)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}


export const likePost = async (req, res, next) => {
    try {
        res.send("hello")
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}