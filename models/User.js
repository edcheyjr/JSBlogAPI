import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

userSchema.methods.success = function () {
  console.log(`successfull created user ${this.firstname} ${this.lastname}`);
  return true;
};

userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});
userSchema.post('save', function (doc, next) {
  doc.success();
  next();
});

export default mongoose.model('User', userSchema);
