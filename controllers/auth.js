const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { createCustomError } = require('../errors/custom-api')
 
const register = async (req, res, next) => {
  const { email, password, name } = req.body
  if (!email || !password || !name) {
    return next(createCustomError('Please complete all fields', StatusCodes.BAD_REQUEST))
  }
  const user = await User.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }})
} 

const login = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(createCustomError('Please provide email and password', StatusCodes.BAD_REQUEST))
  }
  const user = await User.findOne({ email })
  if (!user) {
    return next(createCustomError('No user found with email provided', StatusCodes.UNAUTHORIZED))
  }
  // compare password
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    return next(createCustomError('Invalid password', StatusCodes.UNAUTHORIZED))
  }
  
  res.status(StatusCodes.OK).json({ user: { name: user.name }})
}

module.exports = {
  register,
  login
}
