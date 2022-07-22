const {Schema, model} = require("mongoose")

const postSchema = new Schema(
    {
        title: String,
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User"
          },
        channel: {
            type: String    
        },
        votes: {
            type: Number
        },
        fileURL: {
            type: String
        },
        description: {
            type: String

        },
    },
    {
        timestamps: true
      }
)


const Post = model("Post", postSchema);

module.exports = Post;
