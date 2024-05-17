import jwt from 'jsonwebtoken'
import { logMessage, logObjectData } from '../utils/logging.js'

const tokenSecret = process.env.JWT_TOKEN_SECRET || 'my-token-secret'

const verify = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) res.status(403).json({ error: 'please provide a token' })
  else {
    try {
      logMessage(`verifying token: ${token}`)
      jwt.verify(token.split(' ')[1], tokenSecret, (err, value) => {
        if (err) {
          logObjectData(err, 'error info: ')
          res.status(500).json({ error: 'failed to authenticate token' })
        } else {
          req.user = value.data
          next()
        }
      })
    } catch (error) {
      logMessage(`verifying token: ${token}`)
      res.status(500).json({ error: 'failed to authenticate token' })
    }
  }
}
export default verify
