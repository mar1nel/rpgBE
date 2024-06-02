import express, { Request, Response } from 'express';
import Profile from '../models/Profile';
import Item from "../models/Item";

const router = express.Router();

// GET all profiles
router.get('/', async (req: Request, res: Response) => {
    try {
        const profiles = await Profile.find({});
        res.status(200).json(profiles);
    } catch (error) {
        console.error('Failed to retrieve profiles:', error);
        res.status(500).send('Server error');
    }
});

// POST create a new profile
router.post('/', async (req: Request, res: Response) => {
    try {
        const newProfile = new Profile(req.body);
        await newProfile.save();
        res.status(201).send(newProfile);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

router.post('/api/profiles', async (req: Request, res: Response) => {
    try {
        const { profileNickname, solanaAddress, money } = req.body; // Extract data from request body
        const profile = new Profile({
            profileNickname,
            solanaAddress,
            // class,
            money,
        });
        await profile.save(); // Save the new profile to MongoDB
        res.status(201).send(profile);
    } catch (error) {
        res.status(400).send(error);
    }
});


export default router;
