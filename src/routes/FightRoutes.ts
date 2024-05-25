import express, { Request, Response } from 'express';
import Fight from '../models/Fight';

const router = express.Router();

// GET all fights
router.get('/', async (req: Request, res: Response) => {
    try {
        const fights = await Fight.find({});
        res.status(200).json(fights);
    } catch (error) {
        console.error('Failed to retrieve fights:', error);
        res.status(500).send('Server error');
    }
});

// POST create a new fight
router.post('/', async (req: Request, res: Response) => {
    try {
        const newFight = new Fight(req.body);
        await newFight.save();
        res.status(201).send(newFight);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

export default router;
