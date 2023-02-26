import { Promise } from "mongoose";
import UserModel from "../models/user.model.js";

export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id)
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}



export const getUserFriends = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id).select('friends -_id');
        const friends = user?.friends;



        res.status(200).json(friends)


    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

export const getFriendSuggestion = async (req, res, next) => {
    try {
        const id = req.params.id;
        const allUser = await UserModel.find().select("firstName lastName picturePath")
        const user = await UserModel.findById(id).select('friends -_id');


        const friends = user.friends

        const suggestion = allUser.filter(obj => !friends.includes(obj._id));


        console.log(suggestion);


        res.status(200).json(suggestion)


    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}



export const addOrRemoveFriend = async (req, res, next) => {
    try {
        const { id, friendId } = req.params;

        const user = await UserModel.findById(id).select('friends -_id');
        const friends = user?.friends;
        const isFriend = friends?.includes(friendId);

        if (isFriend) {
            const updatedFriends = friends?.filter(ef => ef !== friendId)
            const result = await UserModel.findOneAndUpdate({ _id: id }, { friends: updatedFriends }, { new: true })

            res.status(200).json(result.friends);

        }

        else {

            const updatedFriends = [...friends, friendId]
            const result = await UserModel.findOneAndUpdate({ _id: id }, { friends: updatedFriends }, { new: true })

            res.status(200).json(result.friends);

        }




    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}


export const updateProfile = async (req, res, next) => {

    try {
        const users = req.body;
        const _id = req.params.id;

        const updatedProfile = await UserModel.findOneAndUpdate(_id, users, { new: true })

        res.status(200).json(updatedProfile)
        // res.send("")
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}


export const getAllUser = async (req, res, next) => {

    try {

        const users = await UserModel.find()
        const result = users.map(user => ({ firstName: user.firstName, lastName: user.lastName, _id: user._id, email: user.email, picturePath: user.picturePath }))
        res.status(200).json(result)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}