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
        const userId = req.params.id;

        const posts = await PostModel.find({ userId })
        res.status(200).json(posts)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}


export const likePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await PostModel.findById(id)
        const isLiked = post.likes.get(userId)

        if (isLiked) {
            post.likes.delete(userId)
        }
        else {
            post.likes.set(userId, true)
        }

        const updatedPost = await PostModel.findByIdAndUpdate(id, { likes: post.likes }, { new: true })

        res.status(200).json(updatedPost)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}


export const deletePost = async (req, res, next) => {
    try {
        const _id = req.params.id;


        const result = await PostModel.findOneAndDelete(_id)
        res.status(200).json(result)
        // next()



    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}