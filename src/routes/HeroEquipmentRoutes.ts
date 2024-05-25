import express, { Request, Response } from 'express';
import HeroEquipment from '../models/HeroEquipment';

const router = express.Router();

// GET all hero equipment
router.get('/', async (req: Request, res: Response) => {
    try {
        const heroEquipment = await HeroEquipment.find({});
        res.status(200).json(heroEquipment);
    } catch (error) {
        console.error('Failed to retrieve hero equipment:', error);
        res.status(500).send('Server error');
    }
});

// POST create a new hero equipment
router.post('/', async (req: Request, res: Response) => {
    try {
        const newHeroEquipment = new HeroEquipment(req.body);
        await newHeroEquipment.save();
        res.status(201).send(newHeroEquipment);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

export default router;
