const router = require("express").Router();
const CreateChannel = require("../models/Channel.model")
const CreatePost = require("../models/Post.model")

const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res, next) => {
  res.json("All good in here");
})

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

router.post("/upload", fileUploader.single("fileURL"), (req, res, next) => {
  //console.log(req.file)
 
  res.json({ secure_url: req.file.path });
});


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
					//console.log(err)
					res.status(500).json({ message: 'Internal Server Error' })
				})
		})   
})

router.post("/posts", (req, res, next) => {
  const {title, fileURL, description, creator} = req.body

  if (title === '' && fileURL === '' && description === '') {
		res.status(400).json({ message: 'Provide a title, file or description' })
		return
	}

  return CreatePost.create({title, fileURL, description, creator})
    .then(createdPost => {
      res.json(createdPost)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Internal Server Error' })
    })
})

module.exports = router;
