import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js";

const register = async (req, res, next) => {
    try {

        const {
            firstName, lastName, email, password, location, picturePath, friends, occupation,
        } = req.body

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = new UserModel({

            firstName,
            lastName,
            email,
            password: passwordHash,
            location,
            picturePath,
            friends,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)

        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser)

    }
    catch (err) {
        res.status(500).json({ error: err.message })

    }
}

export default register;