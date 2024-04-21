import express, { Request, Response } from 'express';
const router = express.Router();
const Profile = require('../models/Profile');  // Ensure your model is compatible with TypeScript

router.post('/', async (req: Request, res: Response) => {

    router.post('/', async (req, res) => {
        res.status(201).send({ message: 'Profile created' });
    });

    try {
        const newProfile = new Profile(req.body);
        await newProfile.save();
        res.status(201).send(newProfile);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

module.exports = router ;
