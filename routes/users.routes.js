import express from "express";
import { addOrRemoveFriend, getUser, getUserFriends, updateProfile } from "../controllers/users.js";
import { deletePrevImage } from "../middlewares/destroyPrevImage.js";
import verifyJwt from "../middlewares/verifyJwt.js";


const router = express.Router()

router.post("/del_prev", deletePrevImage)
router.patch('/update/:id', verifyJwt, updateProfile)

router.patch('/:id/:friendId', verifyJwt, addOrRemoveFriend)
router.get('/:id', verifyJwt, getUser)
router.get('/:id/friends', verifyJwt, getUserFriends)





export default router;