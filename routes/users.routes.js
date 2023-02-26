import express from "express";
import { addOrRemoveFriend, getAllUser, getFriendSuggestion, getUser, getUserFriends, updateProfile } from "../controllers/users.js";
import { deletePrevImage } from "../middlewares/destroyPrevImage.js";
import verifyJwt from "../middlewares/verifyJwt.js";


const router = express.Router()

router.get("/all", verifyJwt, getAllUser)
router.post("/del_prev", deletePrevImage)
router.patch('/update/:id', verifyJwt, updateProfile)
router.get('/suggestion/:id', verifyJwt, getFriendSuggestion)

router.get('/:id', verifyJwt, getUser)
router.get('/:id/friends', verifyJwt, getUserFriends)
router.patch('/:id/:friendId', verifyJwt, addOrRemoveFriend)






export default router;