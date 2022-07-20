const {Schema, model} = require("mongoose")

const roomSchema = new Schema(
    {
        name: {
            type: String,
            unique: true
        },
        posts: {
            type: Schema.Types.ObjectId,
            ref: "Post"
          },
    }
)


const Room = model("Room", roomSchema);

module.exports = Room;
