import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,

        },
        location: String,
        description: String,
        picturePath: String,
        picturePublicId: String,

        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: [],
        }
    },
    {
        timestamps: true

    }
)

const PostModel = mongoose.model("post", postSchema)

export default PostModel