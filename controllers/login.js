import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email: email})
        if(!user._id){
            return res.status(404).send({msg: 'User not found'})
        }
        else{
            const isMatched = await bcrypt.compare(password, user.password)

            if(!isMatched){
                return res.status(404).send({msg: 'Password did not match'})
            }
            else{
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
                user.password = '';
                res.status(200).send({user, token})
            }
        }

    } catch (error) {
        res.status(404).send({ error: error.message })
    }
}
export default login;