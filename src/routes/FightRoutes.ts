import express, { Request, Response } from 'express';
import Profile from '../models/Profile';
import Enemy from '../models/Enemy';

const router = express.Router();

const XP_BASE = 100;
const XP_GROWTH_RATE = 1.2;

function calculateNewLevel(currentLevel: number, currentXP: number, xpGained: number) {
    let totalXP = currentXP + xpGained;
    let newLevel = currentLevel;

    const calculateXpForNextLevel = (level: number) => {
        return Math.floor(XP_BASE * Math.pow(level, XP_GROWTH_RATE));
    };

    while (totalXP >= calculateXpForNextLevel(newLevel)) {
        totalXP -= calculateXpForNextLevel(newLevel);
        newLevel++;
    }

    return { newLevel, totalXP };
}

router.post('/', async (req: Request, res: Response) => {
    const { userId, enemyId } = req.body;

    try {
        const user = await Profile.findById(userId);
        const enemy = await Enemy.findById(enemyId);

        if (!user || !enemy) {
            return res.status(404).json({ message: 'User or Enemy not found' });
        }

        if (user.money < enemy.enemyCost) {
            return res.status(400).json({ message: 'Not enough money to fight this enemy' });
        }

        user.money -= enemy.enemyCost;

        // Calculate the new level and XP
        const { newLevel, totalXP } = calculateNewLevel(user.level, user.experiencePoints, enemy.baseExpReward);

        user.level = newLevel;
        user.experiencePoints = totalXP;
        user.money += enemy.baseMoneyReward;

        // --------- LOOT DROP REWARD ----------

        const lootDrop = enemy.lootDropReward;

        // Add the item to inventory
        for (let i = 0; i < user.inventory.length; i++) {
            if (user.inventory[i].itemId === 0 && user.inventory[i].unlocked) {
                user.inventory[i].itemId = lootDrop.itemId;
                user.inventory[i].quantity = lootDrop.quantity;
                break;
            }
        }

        await user.save();

        res.status(200).json({ user, message: 'Fight successful' });
    } catch (error) {
        console.error('Fight failed:', error);
        res.status(500).send('Server error');
    }
});

export default router;
