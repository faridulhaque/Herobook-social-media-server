import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        email: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        password: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },

        friends: {
            type: Array,
            default: []
        },
        picturePath: {
            type: String,
            default: "https://i.ibb.co/6YK1cXs/avatar.jpg"
        },

        picturePublicId: String,
        location: String,
        birthDate: String,
        currentCity: String,
        homeTown: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number

    }, {
    timestamps: true
}
)

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;