import Blog from '../models/blog.model.js'
import { logMessage, logObjectData } from '../utils/logging.js'

// Create and Save a new  Blog
const createBlog = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: 'blog title is required',
    })
  }
  if (!req.body.content) {
    return res.status(400).send({
      message: 'blog content can not be empty',
    })
  }
  logMessage(`attempting to create blog with title ${req.body.title}`)

  // Create a blog
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    body: req.body.content,
    createdAt: Date.now(),
  })

  // Save blog in the database

  try {
    const data = await blog.save()
    logObjectData('response from db:', data)
    res.send('blog sent successfully, happy blogging!!')
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Blog.',
    })
  }
}

// Retrieve and return all blogs from the database.
const findAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
    res.send(blogs)
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving blogs.',
    })
  }
}
// find all blogs with status true
const findAllApprovedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: true })

    res.send(blogs)
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving blogs.',
    })
  }
}

// find blogs for that user
const findAllBlogsForUser = async (req, res) => {
  try {
    if (req.param.userId) {
      const blogs = await Blog.find({ owner: req.param.userId })
      res.send(blogs)
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving blogs.',
    })
  }
}

// Find a single blog with a blogId or useremail
const findOneBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.body.blogId)
    if (!blog) {
      return res.status(404).send({
        message: 'blog not found with id ' + req.body.blogId,
      })
    }
    if (blog.email == req.user) {
      res.send(blog)
    } else {
      res.send({})
    }
  } catch {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'blog not found with id ' + req.body.blogId,
      })
    }
    return res.status(500).send({
      message: 'Error retrieving blog with id ' + req.body.blogId,
    })
  }
}

// Update a blog identified by the blogId in the request
const updateBlog = async (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: 'blog content can not be empty',
    })
  }

  // Find blog and update it with the request body
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.param.blogId,
      {
        title: req.param.title || 'Untitled blog',
        description: req.param.description,
        body: req.param.content,
        status: false,
      },
      { new: true }
    )
    if (!blog) {
      return res.status(404).send({
        message: 'blog not found with id ' + req.param.blogId,
      })
    }
    res.send(blog)
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'blog not found with id ' + req.param.blogId,
      })
    }
    return res.status(500).send({
      message: 'Error updating blog with id ' + req.param.blogId,
    })
  }
}

// Update a blog identified by the blogId in the request
const updateStatusOfBlog = async (req, res) => {
  // Validate Request
  if (!req.body.blogId) {
    return res.status(400).send({
      message: 'blog Id required',
    })
  }

  // Find blog and update it with the request body
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.body.blogId,
      {
        status: true,
      },
      { new: true }
    )
    if (!blog) {
      return res.status(404).send({
        message: 'blog not found with id ' + req.body.blogId,
      })
    }
    res.send(blog)
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'blog not found with id ' + req.body.blogId,
      })
    }
    return res.status(500).send({
      message: 'Error updating blog with id ' + req.body.blogId,
    })
  }
}

// Delete a blog with the specified blogId in the request
const deleteBlog = async (req, res) => {
  try {
    const blog = Blog.findByIdAndRemove(req.body.blogId)
    if (!blog) {
      return res.status(404).send({
        message: 'blog not found with id ' + req.body.blogId,
      })
    }
    res.send({ message: 'blog deleted successfully!' })
  } catch (err) {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: 'blog not found with id ' + req.body.blogId,
      })
    }
    return res.status(500).send({
      message: 'Could not delete blog with id ' + req.body.blogId,
    })
  }
}

export {
  createBlog,
  findAllBlogs,
  findOneBlog,
  findAllApprovedBlogs,
  updateBlog,
  updateStatusOfBlog,
  deleteBlog,
  findAllBlogsForUser,
}
