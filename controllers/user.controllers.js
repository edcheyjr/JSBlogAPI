import User from '../models/User.js';

// Create and Save a new User
const createUser = async (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: 'user content can not be empty',
    });
  }

  // Create a user
  const user = new User({
    firstname: res.body.firstname,
    lastname: res.body.lastname,
    email: res.body.email,
    password: res.body.password,
    createdAt: Date.now(),
  });

  // Save user in the database
  try {
    const data = await user.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the user.',
    });
  }
};

// Retrieve and return all users from the database.
const findAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving users.',
    });
  }
};

// Find a single user with a userId
const findOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({
        message: 'user not found with id ' + req.params.userId,
      });
    }
    if (user.email == req.params.email) {
      res.send(user);
    } else {
      res.send({});
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'user not found with id ' + req.params.userId,
      });
    }
    return res.status(500).send({
      message: 'Error retrieving user with id ' + req.params.userId,
    });
  }
};

// Update a user identified by the userId in the request
const updateUser = async (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: 'user content can not be empty',
    });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.userId, {
      firstname: req.params.firstname,
      lastname: req.params.lastname,
      email: body.params.email,
      password: req.params.password,
    });
    if (!user) {
      return res.status(404).send({
        message: 'user not found with id ' + req.params.userId,
      });
    }
    res.send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'user not found with id ' + req.params.userId,
      });
    }
    return res.status(500).send({
      message: 'Error updating user with id ' + req.params.userId,
    });
  }
  // Find user and update it with the request body
};

// Delete a user with the specified userId in the request
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.userId);
    if (!user) {
      return res.status(404).send({
        message: 'user not found with id ' + req.params.userId,
      });
    }
    res.send({ message: 'user deleted successfully!' });
  } catch (err) {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: 'user not found with id ' + req.params.userId,
      });
    }
    return res.status(500).send({
      message: 'Could not delete user with id ' + req.params.userId,
    });
  }
};

export { createUser, findAllUser, findOneUser, updateUser, deleteUser };
