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
        const { profileNickname, solanaAddress, profileClass, money, level, healthPoints } = req.body;

        // Initialize the inventory with 24 slots
        const initialInventory = Array(24).fill(null).map((_, index) => ({
            itemId: 0,  // No Item
            quantity: 0,
            equipped: false,
            unlocked: index < 16  // First 16 slots are unlocked
        }));

        const newProfile = new Profile({
            profileNickname,
            solanaAddress,
            profileClass,
            money: 100,
            level: 0,
            healthPoints: 100,
            inventory: initialInventory
        });

        await newProfile.save();
        res.status(201).send(newProfile);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

router.post('/api/profiles', async (req: Request, res: Response) => {
    try {
        const { profileNickname, solanaAddress, profileClass, money, level, healthPoints } = req.body; // Extract data from request body
        const profile = new Profile({
            profileNickname,
            solanaAddress,
            profileClass,
            money,
            level,
            healthPoints
        });
        await profile.save(); // Save the new profile to MongoDB
        res.status(201).send(profile);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.get('/login/:solanaAddress', async (req, res) => {
    console.log("Requested solanaAddress:", req.params.solanaAddress);  // Debugging output

    try {
        const profile = await Profile.findOne({ solanaAddress: req.params.solanaAddress.trim() });
        if (profile) {
            console.log("Profile found:", profile);
            res.json(profile);
        } else {
            console.log("No profile found for:", req.params.solanaAddress);
            res.status(404).send('Profile not found');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Server error');
    }
});

export default router;
