import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import profileRoutes from "./routes/ProfileRoutes";
import itemRoutes from "./routes/ItemRoutes";
import classesRoutes from "./routes/ClassesRoutes";
import heroRoutes from "./routes/HeroRoutes";
import heroEquipmentRoutes from "./routes/HeroEquipmentRoutes";
import dungeonRoutes from "./routes/DungeonRoutes";
import dungeonEnemyRoutes from "./routes/DungeonEnemyRoutes";
import enemyRoutes from "./routes/EnemyRoutes";
import fightRoutes from "./routes/FightRoutes";

const mongoURI = 'mongodb://127.0.0.1:27017/rpgLicence';
const port = 8080; // Backend server port

mongoose.connect(mongoURI)
    .then(() => console.log('-- Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

const app = express();

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
};

app.use(cors());
app.use(express.json()); // For parsing application/json

app.use('/profiles', profileRoutes);
app.use('/items', itemRoutes);
app.use('/classes', classesRoutes);
app.use('/heroes', heroRoutes);
app.use('/hero-equipment', heroEquipmentRoutes);
app.use('/dungeons', dungeonRoutes);
app.use('/dungeon-enemies', dungeonEnemyRoutes);
app.use('/enemies', enemyRoutes);
app.use('/fights', fightRoutes);

app.get('/api/test', (req: Request, res: Response) => {
    res.json({ message: 'Hello from Express!' });
});

app.listen(port, () => {
    console.log(`-- Server running on port: ${port}`);
});
