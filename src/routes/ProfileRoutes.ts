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

//POST create a new profile
router.post('/', async (req: Request, res: Response) => {
    try {
        const { profileNickname, solanaAddress, profileClass, money, level, healthPoints } = req.body;

        // Init 16 unlocked slots & 8 locked slots
        const initialInventory = new Array(24).fill(null).map((_, index) => ({
            itemId: 0,  // Assuming 0 means 'empty'
            quantity: 0,
            equipped: false,
            unlocked: index < 16  // First 16 slots are unlocked, rest are locked
        }));

        const profile = new Profile({
            profileNickname,
            solanaAddress,
            profileClass,
            money,
            level,
            healthPoints,
            inventory: initialInventory
        });

        await profile.save();
        res.status(201).send(profile);
    } catch (error) {
        res.status(500).send("Error creating profile: " + error);
    }
});


// ADDING ITEMS

router.patch('/profiles/:profileId/unlock-slot', async (req: Request, res: Response) => {
    try {
        const profileId = req.params.profileId;
        const slotIndex = req.body.slotIndex; // index of the slot to unlock

        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).send("Profile not found");
        }

        // Check if slot can be unlocked
        if (slotIndex >= 16 && slotIndex < 24 && !profile.inventory[slotIndex].unlocked) {
            profile.inventory[slotIndex].unlocked = true; // Unlock the slot
            await profile.save();
            res.status(200).send("Slot unlocked successfully");
        } else {
            res.status(400).send("Invalid slot or slot already unlocked");
        }
    } catch (error) {
        console.error("Failed to unlock slot:", error);
        res.status(500).send("Server error");
    }
});



export default router;
