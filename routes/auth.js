const router = require("express").Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middlewares/jwt')
const User = require('../models/User.model')

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body

    if (username === '' || password === '') {
		res.status(400).json({ message: 'Provide username and password' })
		return
	}
	if (password.length < 4) {
		res.status(400).json({ message: 'Password has to be 4 chars min' })
		return
	}

    User.findOne({ username })
    .then(foundUser => {
        if (foundUser) {
            res.status(400).json({ message: 'Username already exists' })
            return
        }

        const salt = bcrypt.genSaltSync();
			const hashedPassword = bcrypt.hashSync(password, salt)

			return User.create({ username, password: hashedPassword })
				.then(createdUser => {
					const { username, _id } = createdUser
					const user = { username, _id }
					res.status(201).json({ user: user })
				})
				.catch(err => {
					console.log(err)
					res.status(500).json({ message: 'Internal Server Error' })
				})
		})   
})

router.post('/login', (req, res, next) => {
	const { username, password } = req.body
	if (username === '' || password === '') {
		res.status(400).json({ message: 'Provide username and password' })
		return
	}
	User.findOne({ username })
		.then(foundUser => {
			if (!foundUser) {
				res.status(400).json({ message: 'Username not found' })
				return
			}
			const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
			if (passwordCorrect) {
				const { _id, username } = foundUser
				const payload = { _id, username }
				const authToken = jwt.sign(
					payload,
					process.env.JWT_SECRET,
					{ algorithm: 'HS256', expiresIn: '12h' }
				)
				res.status(200).json({ authToken })
			} else {
				res.status(401).json({ message: 'Unable to authenticate' })
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ message: 'Internal Server Error' })
		})
});

router.get('/verify', isAuthenticated, (req, res, next) => {
	res.status(200).json(req.payload)
});


module.exports = router;
