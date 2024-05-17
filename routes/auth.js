import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Auth from '../middleware/auth.js'
import validator from 'validator'
import { logMessage, logObjectData } from '../utils/logging.js'

const router = express.Router()

const rounds = 10

const tokenSecret = process.env.JWT_TOKEN_SECRET || 'my-token-secret'

router.post('/login', async (req, res) => {
  logMessage(`attempt to login ${req.body.email}`)
  // check if its empty
  if (req.body.email == undefined || req.body.password == undefined) {
    return res.status(500).send({ error: 'data come as undefined' })
  }
  const isEmptyEmail = validator.isEmpty(req.body.email)
  const isEmptyPassword = validator.isEmpty(req.body.password)
  const isValidMail = validator.isEmail(req.body.email)

  if (isEmptyEmail) {
    return res.status(404).json({ error: 'email field cannot be empty' })
  }
  // validate email

  if (isEmptyPassword) {
    return res.status(404).json({ error: 'password field cannot be empty' })
  }
  if (!isValidMail) {
    return res.status(404).json({ error: 'invalid email' })
  }

  const user = await User.findOne({ email: req.body.email })
  if (user) {
    if (!req.body.email)
      res.status(404).json({ error: 'no user with that email found' })
    else {
      bcrypt.compare(req.body.password, user.password, (error, match) => {
        if (error) {
          console.log('Wrong Password')
          res.status(500).json(error)
        } else if (match)
          // on succesfull login
          res.status(200).json({ token: generateToken(user.email) })
        else res.status(403).json({ error: 'check your credentials' })
      })
    }
  } else {
    console.log('error 500', user)
    logObjectData(user, 'user info: ')
  }
})

// signup
router.post('/signup', async (req, res) => {
  logMessage(
    `attempt to sign up ${req.body.firstname} ${req.body.lastname} ${req.body.email}`
  )
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const password = req.body.password
  const email = req.body.email
  const isValidMail = validator.isEmail(req.body.email)

  if (!isValidMail) {
    return res.status(404).json({ error: 'invalid email' })
  }
  const user = await User.findOne({ email: email })
  if (user) {
    return res
      .status(404)
      .json({ error: 'That email as already be registered' })
  } else {
    try {
      const passwordHashed = await bcrypt.hash(password, rounds)
      console.log('passwordHashed', passwordHashed)
      const newUser = {
        firstname,
        lastname,
        email,
        password: passwordHashed,
        createdAt: Date.now(),
      }
      const insertResult = await User.create(newUser)
      logObjectData(insertResult, 'user info:')
      // log info

      if (insertResult) {
        res.status(200).json({ token: generateToken(newUser.email) })
      } else {
        res.status(500).json({ error: 'oops user was not created' })
      }
    } catch (err) {
      res.status(500).send({ error: err.message })
    }
  }
})

// logout
router.get('/logout', Auth, async (req, res) => {
  res.cookie('token', 'none', {
    httpOnly: true,
  })
  res.status(200).json({
    success: true,
    data: {},
  })
})

// get token
router.get('/jwt-test', Auth, (req, res) => {
  res.status(200).json(req.user)
})

function generateToken(email) {
  return jwt.sign({ data: email }, tokenSecret, { expiresIn: '24h' })
}

export default router
