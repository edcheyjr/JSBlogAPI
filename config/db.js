import mongoose from 'mongoose';
// connect to mongoDB

const URI =process.env.MONGO_URI || '';

const connectDB = async () => {
  try {
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = await mongoose.connection;

    db.on('error', (err) => {
      console.error(err);
    });
    db.once('open', () => {
      console.log(`Mongo DB Connected: ${db.host}`);
    });
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
// const connectDB = async () => {
//   const conn = await mongoose.connect(URI);
// };

export default connectDB;
