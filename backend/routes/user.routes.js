const express = require('express')
const { signupUser, loginUser } = require('../controllers/user.controller')
const userRouter = express.Router()

// signup
userRouter.post('/', signupUser)

// login
userRouter.post('/login', loginUser)

module.exports = userRouter