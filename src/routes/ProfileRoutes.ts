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

// Login route
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

// Give item to a user
router.post('/giveItem', async (req: Request, res: Response) => {
    try {
        const { userId, itemId } = req.body;
        const profile = await Profile.findById(userId);

        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        const availableSlot = profile.inventory.find(slot => !slot.equipped && slot.unlocked && slot.itemId === 0);

        if (!availableSlot) {
            return res.status(400).json({ success: false, message: 'No available slot to receive item' });
        }

        availableSlot.itemId = itemId;
        availableSlot.quantity = 1;

        await profile.save();

        res.status(200).json({ success: true, updatedUser: profile });
    } catch (error) {
        console.error('Error giving item:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Sell an item
router.post('/sell-item', async (req, res) => {
    const { userId, itemId, slotIndex } = req.body;

    try {
        const user = await Profile.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const slot = user.inventory[slotIndex];
        if (!slot || slot.itemId !== itemId || slot.quantity === 0) {
            return res.status(404).send('Item not found in the specified slot');
        }

        if (slot.quantity > 1) {
            slot.quantity -= 1;
        } else {
            slot.itemId = 0;
            slot.quantity = 0;
        }

        const itemDetails = await Item.findOne({ itemId });
        if (!itemDetails) {
            return res.status(404).send('Item details not found');
        }

        user.money += itemDetails.price;

        await user.save();

        res.status(200).json({ user, itemDetails });
    } catch (error) {
        console.error('Failed to sell item:', error);
        res.status(500).send('Server error');
    }
});


export default router;
