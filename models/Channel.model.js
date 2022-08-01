const {Schema, model} = require("mongoose")

const channelSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            lowercase: true
        },
        posts: {
            type: [Schema.Types.ObjectId],
            ref: "Post"
          },
    }
)

const Channel = model("Channel", channelSchema);

module.exports = Channel;
