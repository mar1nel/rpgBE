import express, { Request, Response } from 'express';
import Enemy from '../models/Enemy';
import Profile from '../models/Profile';
import DungeonEnemy from "../models/DungeonEnemy";

const router = express.Router();

router.get('/dungeons/:level/enemies', async (req: Request, res: Response) => {
    const { level } = req.params;

    try {
        const enemies = await Enemy.find({ enemyLevel: level });
        res.status(200).json({ success: true, enemies });
    } catch (error) {
        console.error('Failed to fetch enemies:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch enemies' });
    }
});

router.post('/fight', async (req: Request, res: Response) => {
    const { userId, enemyId } = req.body;

    try {
        const user = await Profile.findById(userId);
        const enemy = await Enemy.findById(enemyId);

        if (!user || !enemy) {
            return res.status(404).json({ success: false, message: 'User or Enemy not found' });
        }

        if (user.money < enemy.enemyCost) {
            return res.status(400).json({ success: false, message: 'Not enough money to fight this enemy' });
        }

        user.money -= enemy.enemyCost;

        const moneyReward = enemy.baseMoneyReward;
        const expReward = enemy.baseExpReward;

        // Cast lootDropReward to expected type
        const lootDropReward = enemy.lootDropReward as unknown as { itemId: number, quantity: number };

        // Check for empty inventory slots and add loot
        for (let i = 0; i < user.inventory.length; i++) {
            if (user.inventory[i].unlocked && user.inventory[i].itemId === 0) {
                user.inventory[i].itemId = lootDropReward.itemId;
                user.inventory[i].quantity += lootDropReward.quantity;
                break;
            }
        }

        user.money += moneyReward;
        user.level += expReward; // Adjust as per your leveling logic

        // Level up dungeon based on experience gained
        user.dungeonLevel = Math.floor(user.level / 10) + 1;

        await user.save();

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Failed to fight enemy:', error);
        res.status(500).json({ success: false, message: 'Failed to fight enemy' });
    }
});

// POST create a new dungeon enemy
router.post('/', async (req: Request, res: Response) => {
    try {
        const newDungeonEnemy = new DungeonEnemy(req.body);
        await newDungeonEnemy.save();
        res.status(201).send(newDungeonEnemy);
    } catch (error: any) {
        console.error('Failed to create dungeon enemy:', error);
        res.status(400).send(error.message);
    }
});

// GET all dungeon enemies
router.get('/', async (req: Request, res: Response) => {
    try {
        const dungeonEnemies = await DungeonEnemy.find({});
        res.status(200).json(dungeonEnemies);
    } catch (error) {
        console.error('Failed to retrieve dungeon enemies:', error);
        res.status(500).send('Server error');
    }
});

export default router;
