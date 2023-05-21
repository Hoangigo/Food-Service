import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import path from 'path';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

/* dotenv.config({
  path: path.join(__dirname, '..', 'config.env'),
}); */
dotenv.config();
const DB = process.env.DATABASE!.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD!
);

mongoose
  .connect(DB, { retryWrites: true, w: 'majority' })
  .then(() => console.log('DB connection successful!'))
  .catch((err: any) => {
    console.log('Error connecting to database:', err);
    process.exit(1);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err: any) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
