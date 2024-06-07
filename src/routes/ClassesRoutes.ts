import express, { Request, Response } from 'express';
import Classes from "../models/Classes";

const router = express.Router();

// GET all classes
router.get('/', async (req: Request, res: Response) => {
    try {
        const classes = await Classes.find({});
        res.status(200).json(classes);
    } catch (error) {
        console.error('Failed to retrieve classes:', error);
        res.status(500).send('Server error');
    }
});

// POST create a new class - 4 classes only #TODO
router.post('/', async (req: Request, res: Response) => {
    try {
        const newClass = new Classes(req.body);
        await newClass.save();
        res.status(201).send(newClass);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

export default router;
