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
        const user = await UserModel.findById(id)

        const friends = await promise.all(
            user.friends.map((id) => UserModel.findById(id))
        );

        const formattedFriends = friends.map(({
            _id, firstName, lastName, picturePath
        }) => {
            return { _id, firstName, lastName, picturePath }
        })

        res.status(200).json(formattedFriends)


    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}



export const addOrRemoveFriend = async (req, res, next) => {
    try {
        const { id, friendId } = req.params;
        const user = await UserModel.findById(id)
        const friend = await UserModel.findById(friendId)

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        } else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }

        await user.save()
        await friend.save()

        const friends = await promise.all(
            user.friends.map((id) => UserModel.findById(id))
        );

        const formattedFriends = friends.map(({
            _id, firstName, lastName, picturePath
        }) => {
            return { _id, firstName, lastName, picturePath }
        })

        res.status(200).json(formattedFriends);


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