const router = require("express").Router();
const Channel = require("../models/Channel.model")
const Post = require("../models/Post.model")

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

    Channel.findOne({ name })
    .then(foundName => {
        if (foundName) {
            res.status(400).json({ message: 'Channel already exists' })
            return
        }

			return Channel.create({ name })
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
  const {title, fileURL, description, creator, channel} = req.body

  if (title === '' && fileURL === '' && description === '') {
		res.status(400).json({ message: 'Provide a title, file or description' })
		return
	}

  return Post.create({title, fileURL, description, creator, channel})
    .then(createdPost => {
      //console.log(createdPost)
      Channel.findOneAndUpdate({name:channel}, {$push: {posts:createdPost._id}})
        .then((updatedChannel) => {
        console.log(updatedChannel)
        res.json(createdPost)
      })
    
    })
    
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Internal Server Error' })
    })
})


router.get("/channel/:name", (req, res, next) => {
  const {name} = req.params
  Channel.findOne({ name }).populate('posts')
    .then(foundChannel => {
      res.json(foundChannel)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Internal Server Error' })
    })
})

router.get("posts/:id", (req, res, next) => {
  const {id} = req.params
  Post.findOne({ id }).populate('posts')
    .then(foundPost => {
      res.json(foundPost)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Internal Server Error' })
    })
})

router.post("/posts/:id", (req, res, next) => {
  const {id} = req.params
  const {comment, creator} = req.body
      Post.findByIdAndUpdate(id, {$push: {comments: {text:comment, creator}}}, {new: true})
        .then((updatedPost) => {
        res.json(updatedPost)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })
      })
    
    })


module.exports = router;