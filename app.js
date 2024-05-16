import express from 'express'
import cors from 'cors'
import './loadEnv.js'
import fs from 'fs'
// import bodyParser from 'body-parser';
import bodyParser from 'body-parser'
// import routes

import userRoutes from './routes/users.js'
import blogRoutes from './routes/blogs.js'
import authRoutes from './routes/auth.js'
// connect to db
import connectDB from './config/db.js'
import swaggerUi from 'swagger-ui-express'

//json data
const appInfo = JSON.parse(fs.readFileSync('./package.json'))
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json'))
// port
const PORT = process.env.PORT || 5000
const appVersion = process.env.APP_VERSION || 'v1'

// connect to db
connectDB()

// intializing express
const app = express()

//TODO: restrict to the url for the frontend
app.use(cors())

// using json as the method of sending response
app.use(bodyParser.json())

// blog routes initialization
app.use('/blogs', blogRoutes)

// users routes initialization
app.use('/users', userRoutes)

//  auth routes initialization
app.use('/auth', authRoutes)

//swagger ui endpoint
// Serve Swagger UI at /api-docs
app.use('', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// setting the listening port
app.listen(PORT, () => {
  console.log(
    `Server runnning on port ${PORT}: http://localhost:${PORT}/api/${appVersion}`
  )
  console.log(`${appInfo.name} current version ${appVersion}`)
})
