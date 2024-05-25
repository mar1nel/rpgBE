import express, { Request, Response } from 'express';
import Item from '../models/Item';

const router = express.Router();

// GET all items
router.get('/', async (req: Request, res: Response) => {
    try {
        const items = await Item.find({});
        res.status(200).json(items);
    } catch (error) {
        console.error('Failed to retrieve items:', error);
        res.status(500).send('Server error');
    }
});

// POST create a new item
router.post('/', async (req: Request, res: Response) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).send(newItem);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

export default router;
