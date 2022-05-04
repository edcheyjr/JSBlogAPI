import express from 'express';

// blogController
import * as blogController from '../controllers/blog.controller.js';

// NOTE: Add middleware to verify requests!
import Auth from '../middleware/auth.js';
import Admin from '../middleware/admin.js';

const router = express.Router();

// Create a new blog
router.post('/', Auth, blogController.createBlog);

// Retrieve all/
// NOTE: Only this one uses verify!
//router.get('/', Auth,/.findAll);
router.get('/', Auth, blogController.findAllBlogs);

//route get approved blog
router.get('/approved', Auth, blogController.findAllApprovedBlogs);

// find blogs for that user
router.get('/:userId', Auth, blogController.findAllBlogsForUser);

// Retrieve a single Blog with blogId
router.get('/:blogId', Auth, blogController.findOneBlog);

// Update a Blog with blogId
router.post(':blogId', Auth, blogController.updateBlog);

// approve blog if only you are the admin
router.patch('/approve:blogId', Admin, blogController.updateStatusOfBlog);

// Delete a Blog with blogId
router.delete('/:blogId', Auth, blogController.deleteBlog);

export default router;
