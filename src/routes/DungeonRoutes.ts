import express, { Request, Response } from 'express';
import Dungeon from '../models/Dungeon';

const router = express.Router();

// GET all dungeons
router.get('/', async (req: Request, res: Response) => {
    try {
        const dungeons = await Dungeon.find({});
        res.status(200).json(dungeons);
    } catch (error) {
        console.error('Failed to retrieve dungeons:', error);
        res.status(500).send('Server error');
    }
});

// POST create a new dungeon
router.post('/', async (req: Request, res: Response) => {
    try {
        const newDungeon = new Dungeon(req.body);
        await newDungeon.save();
        res.status(201).send(newDungeon);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

export default router;
