import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { logMessage, logObjectData } from '../utils/logging.js'

const verifyAdmin = (req, res, next) => {
  const tokenSecret = process.env.JWT_TOKEN_SECRET || 'my-token-secret'

  const token = req.headers.authorization
  if (!token) res.status(403).json({ error: 'please provide a token' })
  else {
    logMessage(`verifying token: ${token}`)
    jwt.verify(token.split(' ')[1], tokenSecret, async (err, value) => {
      if (err) {
        logObjectData(err)
        res.status(500).json({ error: 'failed to authenticate token' })
      } else {
        req.user = value.data
        const user = await User.findOne({ email: req.user })
        console.log(user)
        if (user.role != 1) {
          res
            .status(403)
            .send({ error: 'not authorized to do this operations' })
        }
        next()
      }
    })
  }
}
export default verifyAdmin
