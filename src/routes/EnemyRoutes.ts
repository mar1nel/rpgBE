import express, { Request, Response } from 'express';
import Enemy from '../models/Enemy';

const router = express.Router();

// Create a new enemy
router.post('/', async (req: Request, res: Response) => {
    try {
        const newEnemy = new Enemy(req.body);
        await newEnemy.save();
        res.status(201).send(newEnemy);
    } catch (error) {
        console.error('Failed to create enemy:', error);
        res.status(400).send('Error creating enemy');
    }
});

// Fetch enemies by dungeon level
router.get('/level/:dungeonLevel', async (req: Request, res: Response) => {
    const { dungeonLevel } = req.params;

    try {
        const enemies = await Enemy.find({ enemyLevel: Number(dungeonLevel) });
        if (enemies.length === 0) {
            return res.status(404).json({ message: 'No enemies found for this dungeon level.' });
        }
        res.json({ enemies });
    } catch (error) {
        console.error('Failed to fetch enemies:', error);
        res.status(500).send('Server error');
    }
});

export default router;
