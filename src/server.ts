import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import heroEquipmentRoutes from "./routes/HeroEquipmentRoutes";
import dungeonEnemyRoutes from "./routes/DungeonEnemyRoutes";
import profileRoutes from "./routes/ProfileRoutes";
import classesRoutes from "./routes/ClassesRoutes";
import dungeonRoutes from "./routes/DungeonRoutes";
import enemyRoutes from "./routes/EnemyRoutes";
import fightRoutes from "./routes/FightRoutes";
import itemRoutes from "./routes/ItemRoutes";

const mongoURI = 'mongodb://127.0.0.1:27017/rpgLicence';
const port = 8080; // Backend server port

mongoose.connect(mongoURI)
    .then(() => console.log('-- Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

const app = express();

app.use(cors({ origin: 'http://localhost:3030' }));
app.use(express.json());

app.use('/profiles', profileRoutes);
app.use('/items', itemRoutes);
app.use('/classes', classesRoutes);
app.use('/heroequipment', heroEquipmentRoutes); // Ensure the route path matches the frontend request
app.use('/dungeons', dungeonRoutes);
app.use('/dungeon-enemies', dungeonEnemyRoutes);
app.use('/enemies', enemyRoutes);
app.use('/fights', fightRoutes);
app.use('/images', express.static('public/images'));

app.get('/api/test', (req: Request, res: Response) => {
    res.json({ message: 'Hello from Express!' });
});

app.listen(port, () => {
    console.log(`-- Server running on port: ${port}`);
});
