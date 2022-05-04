import express from 'express';
// user controller
import * as userController from '../controllers/user.controllers.js';

import Admin from '../middleware/admin.js';
// import verifyAdmin from '../middleware/admin.js';

// route
const router = express.Router();

// router.use(verifyAdmin)

// Create a new User
router.post('/', Admin, userController.createUser);

// Retrieve all/
// NOTE: Only this one uses verify!
//router.get('/', Admin,/.findAll);
router.get('/', Admin, userController.findAllUser);
//route get approved User

// Retrieve a single User with userId
router.get('/:userId', Admin, userController.findOneUser);

// Update a User with userId
router.put('/:userId', Admin, userController.updateUser);

// Delete a User with userId
router.delete('/:userId', Admin, userController.deleteUser);

export default router;
