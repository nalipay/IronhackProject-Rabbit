const router = require("express").Router();
const CreateChannel = require("../models/Channel.model")
const CreatePost = require("../models/Post.model")

router.get("/", (req, res, next) => {
  res.json("All good in here");
})

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

router.post("/channels", (req, res, next) => {
  const {name} = req.body

  if (name === '') {
		res.status(400).json({ message: 'Provide a channel name' })
		return
	}

    CreateChannel.findOne({ name })
    .then(foundName => {
        if (foundName) {
            res.status(400).json({ message: 'Channel already exists' })
            return
        }

			return CreateChannel.create({ name })
				.then(createdChannel => {
					const { name } = createdChannel
					const channel = { name }
					res.status(201).json({ channel: channel })
				})
				.catch(err => {
					console.log(err)
					res.status(500).json({ message: 'Internal Server Error' })
				})
		})   
})

router.post("/posts", (req, res, next) => {
  const {title, file, description} = req.body

  if (title === '' && file === '' && description === '') {
		res.status(400).json({ message: 'Provide a title, file or description' })
		return
	}

  return CreatePost.create({title, file, description})
    .then(createdPost => {
      res.json(createdPost)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Internal Server Error' })
    })
})

module.exports = router;
