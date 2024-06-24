import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import HeroEquipment from '../models/HeroEquipment';
import Profile from '../models/Profile';

const router = express.Router();

// POST equip an item
router.post('/equip', async (req: Request, res: Response) => {
    try {
        const { solanaAddress, itemId, type } = req.body;
        console.log(`Received equip request: solanaAddress=${solanaAddress}, itemId=${itemId}, type=${type}`);

        // Find user and update inventory
        const user = await Profile.findOne({ solanaAddress });
        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }

        // Mark item as equipped in user's inventory
        const inventoryItem = user.inventory.find((item) => item.itemId === itemId);
        if (!inventoryItem) {
            console.log('Item not found in inventory');
            return res.status(404).send('Item not found in inventory');
        }

        inventoryItem.equipped = true;

        // Save the updated user
        await user.save();
        console.log('User inventory updated:', user.inventory);

        // Create new HeroEquipment entry
        const newHeroEquipment = new HeroEquipment({
            heroID: user._id,
            equipmentType: type,
            equipmentID: new mongoose.Types.ObjectId(itemId), // Use new keyword
        });
        await newHeroEquipment.save();

        console.log(`Item equipped successfully: ${newHeroEquipment}`);
        res.status(201).send(newHeroEquipment);
    } catch (error: any) {
        console.error('Failed to equip item:', error);
        res.status(400).send(error.message);
    }
});

export default router;
