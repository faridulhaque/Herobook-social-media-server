import express from "express";
import { feedPosts, likePost, userPosts } from "../controllers/posts.js";
import verifyJwt from "../middlewares/verifyJwt.js";


const router = express.Router()


router.get('/', verifyJwt, feedPosts)
router.get('/:id', verifyJwt, userPosts)
router.patch('/:id/like',verifyJwt, likePost)


export default router;