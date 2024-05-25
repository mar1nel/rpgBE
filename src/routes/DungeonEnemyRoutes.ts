import express, { Request, Response } from 'express';
import DungeonEnemy from '../models/DungeonEnemy';

const router = express.Router();

// GET all dungeon enemies
router.get('/', async (req: Request, res: Response) => {
    try {
        const dungeonEnemies = await DungeonEnemy.find({});
        res.status(200).json(dungeonEnemies);
    } catch (error) {
        console.error('Failed to retrieve dungeon enemies:', error);
        res.status(500).send('Server error');
    }
});

// POST create a new dungeon enemy
router.post('/', async (req: Request, res: Response) => {
    try {
        const newDungeonEnemy = new DungeonEnemy(req.body);
        await newDungeonEnemy.save();
        res.status(201).send(newDungeonEnemy);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

export default router;
