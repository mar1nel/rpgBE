import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import HeroEquipment from '../models/HeroEquipment';
import Profile from '../models/Profile';
import Item from '../models/Item'; // Import the Item model

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

        // Find the Item document to get its _id
        const item = await Item.findOne({ itemId });
        if (!item) {
            console.log('Item not found in the database');
            return res.status(404).send('Item not found in the database');
        }

        // Create new HeroEquipment entry
        const newHeroEquipment = new HeroEquipment({
            heroID: user._id,
            equipmentType: type,
            equipmentID: item._id, // Use item's _id here
        });
        await newHeroEquipment.save();

        console.log(`Item equipped successfully: ${newHeroEquipment}`);
        res.status(201).send(newHeroEquipment);
    } catch (error: any) {
        console.error('Failed to equip item:', error);
        res.status(400).send(error.message);
    }
});

// GET equipped items for a user
router.get('/equipped-items/:solanaAddress', async (req: Request, res: Response) => {
    try {
        const { solanaAddress } = req.params;
        const user = await Profile.findOne({ solanaAddress });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const equippedItems = await HeroEquipment.find({ heroID: user._id }).populate('equipmentID');
        const equippedItemsData = equippedItems.map(ei => {
            if (ei.equipmentID instanceof mongoose.Types.ObjectId) {
                throw new Error('equipmentID is not populated');
            }

            return {
                slotType: ei.equipmentType,
                itemId: ei.equipmentID._id,
                itemName: ei.equipmentID.itemName,
                imageUrl: ei.equipmentID.imageUrl,
                type: ei.equipmentID.itemType.toLowerCase() as 'armor' | 'helmet' | 'weapon' | 'ring' | 'pants',
            };
        });

        res.status(200).json(equippedItemsData);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;
