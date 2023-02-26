import express from "express";
import { deletePost, feedPosts, getComments, likePost, makeComment, userPosts } from "../controllers/posts.js";
import verifyJwt from "../middlewares/verifyJwt.js";


const router = express.Router()


router.post('/comment',verifyJwt, makeComment)
router.patch('/like',verifyJwt, likePost)
router.get('/all', verifyJwt, feedPosts)
router.get('/all/:id', verifyJwt, userPosts)
router.get('/comments/:id',verifyJwt, getComments)
router.delete('/:id', verifyJwt, deletePost)


export default router;