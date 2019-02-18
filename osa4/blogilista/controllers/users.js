const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (body.username === undefined || body.password === undefined ) {
        return response.status(400).json({ error: 'username or password missing' })
    } else if (body.username.length < 4 || body.password.length < 4) {
        return response.status(400).json({error: 'username or password length less than 4 characters'})
    } 

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (request, response, next) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
    response.json(users.map(u => u.toJSON()))
  })

module.exports = usersRouter