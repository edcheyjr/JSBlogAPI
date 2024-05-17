import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
})

export default mongoose.model('Blog', blogSchema)
