import express, { Request, Response } from 'express';
import Enemy from '../models/Enemy';

const router = express.Router();

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
