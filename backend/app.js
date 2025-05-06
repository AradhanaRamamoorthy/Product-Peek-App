import express from 'express';
import connectDB from './config/mongoDatabase.js';
import configRoutes from './routes/index.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

configRoutes(app);

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log("We've now got a server!");
      console.log(`Your routes will be running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

startServer();

