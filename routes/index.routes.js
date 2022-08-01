const router = require("express").Router();
const Channel = require("../models/Channel.model")
const Post = require("../models/Post.model")

const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res, next) => {
  res.json("All good in here");
})

router.post("/upload", fileUploader.single("fileURL"), (req, res, next) => { 
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
      Channel.findOneAndUpdate({name:channel}, {$push: {posts:createdPost._id}})
        .then((updatedChannel) => {
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

router.post("/posts/vote", (req, res, next) => {
  const {id, amount} = req.body
  Post.findByIdAndUpdate(id, { $inc: { votes: amount} })
    .then((updatedPost) => {
      res.json(updatedPost)
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

  router.get("/channels", (req, res, next) => {
  const {q} = req.query
  Channel.find({"name" : {$regex : q}})
    .then(foundChannels => {
      res.json(foundChannels)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Internal Server Error' })
    })
})

router.get("/posts", (req, res, next) => {
  Post.find()
    .then(foundPosts => {
      res.json(foundPosts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Internal Server Error' })
    })
})

router.delete('/posts/:id', (req, res, next) => {

  console.log(req.params)
	Post.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(200).json({ message: 'post deleted' })
		})
		.catch(err => next(err))
});

module.exports = router;