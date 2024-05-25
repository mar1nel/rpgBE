import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import profileRoutes from "./routes/ProfileRoutes";

const mongoURI = 'mongodb://127.0.0.1:27017/rpgLicence';
const port = 8080; // Backend server port

mongoose.connect(mongoURI)
    .then(() => console.log('-- Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json

app.use('/profiles', profileRoutes);

app.get('/api/test', (req: Request, res: Response) => {
    res.json({ message: 'Hello from Express!' });
});

app.listen(port, () => {
    console.log(`-- Server running on port: ${port}`);
});
