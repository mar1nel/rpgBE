import express, { Request, Response } from 'express';
import Hero from "../models/Hero";

const router = express.Router();

// GET all heroes
router.get('/', async (req: Request, res: Response) => {
    try {
        const heroes = await Hero.find({});
        res.status(200).json(heroes);
    } catch (error) {
        console.error('Failed to retrieve heroes:', error);
        res.status(500).send('Server error');
    }
});

// POST create a new hero
router.post('/', async (req: Request, res: Response) => {
    try {
        const newHero = new Hero(req.body);
        await newHero.save();
        res.status(201).send(newHero);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

export default router;
