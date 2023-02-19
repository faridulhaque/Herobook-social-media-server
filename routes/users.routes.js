import express from "express";
import { addOrRemoveFriend, getUser, getUserFriends } from "../controllers/users.js";
import verifyJwt from "../middlewares/verifyJwt.js";


const router = express.Router()

router.get('/:id', verifyJwt, getUser)
router.get('/:id/friends', verifyJwt, getUserFriends)

router.patch('/:id/:friendId', verifyJwt, addOrRemoveFriend)


export default router;