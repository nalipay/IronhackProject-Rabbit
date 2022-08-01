const {Schema, model} = require("mongoose")

const postSchema = new Schema(
    {
        title: String,
        creator: {
            type: String
          },
        channel: {
            type: String    
        },
        votes: {
            type: Number,
            default: 0
        },
        fileURL: {
            type: String
        },
        description: {
            type: String

        },
        comments: [
            {
                text: String,
                creator: String
        },
        ],
    },
    { 
        timestamps: true
      }
)

const Post = model("Post", postSchema);

module.exports = Post;
