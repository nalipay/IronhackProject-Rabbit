const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    password: {
      type: String,
    },
    posts: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
