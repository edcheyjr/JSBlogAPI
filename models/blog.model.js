import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    default: true,
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
});

export default mongoose.model('Blog', blogSchema);
