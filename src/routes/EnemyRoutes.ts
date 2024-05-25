import express, { Request, Response } from 'express';
import Enemy from '../models/Enemy';

const router = express.Router();

// GET all enemies
router.get('/', async (req: Request, res: Response) => {
    try {
        const enemies = await Enemy.find({});
        res.status(200).json(enemies);
    } catch (error) {
        console.error('Failed to retrieve enemies:', error);
        res.status(500).send('Server error');
    }
});

// POST create a new enemy
router.post('/', async (req: Request, res: Response) => {
    try {
        const newEnemy = new Enemy(req.body);
        await newEnemy.save();
        res.status(201).send(newEnemy);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

export default router;
