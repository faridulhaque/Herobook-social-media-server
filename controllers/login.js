import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email: email})
        if(!user._id){
            return res.status(404).json({msg: 'User not found'})
        }
        else{
            const isMatched = await bcrypt.compare(password, user.password)

            if(!isMatched){
                return res.status(404).json({message: 'Password did not match'})
            }
            else{
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
                const loggedInUser = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    picturePath: user.picturePath,
                    _id: user._id,
                }
                res.status(200).json({loggedInUser, token})
            }
        }

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export default login;