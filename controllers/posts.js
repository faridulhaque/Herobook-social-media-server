import mongoose from "mongoose";
import PostModel from "../models/post.model.js"

export const feedPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find()
        posts.reverse();
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
        posts.reverse();
        res.status(200).json(posts)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}


export const likePost = async (req, res, next) => {
    try {

        const { userId, postId } = req.body;
        const post = await PostModel.findById(postId)
        const isLiked = post.likes.get(userId)

        if (isLiked) {
            post.likes.delete(userId)
        }
        else {
            post.likes.set(userId, true)
        }

        const updatedPost = await PostModel.findByIdAndUpdate(postId, { likes: post.likes }, { new: true })

        res.status(200).json(updatedPost)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const makeComment = async (req, res) => {
    try {
        const userId = req.body.userId;
        const postId = req.body.postId;
        const comment = req.body.comment;
        const newComment = {
            userId,
            comment
        }


        const post = await PostModel.findById(postId).select('comments -_id');
        const oldComments = post.comments;
        newComment.sl = oldComments.length + 1;
        const allComments = [...oldComments, newComment];

        const update = await PostModel.findByIdAndUpdate({ _id: postId }, { comments: allComments }, { new: true });

        // console.log(newComment)


        res.status(200).json(update)


    } catch (error) {
        res.status(404).json({ message: error.message })

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


export const getComments = async (req, res, next) => {
    try {
        const id = req.params.id;
        const post = await PostModel.findById(id).select('comments _id');
        const comments = post?.comments.reverse();

        res.status(200).json(comments)


    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}