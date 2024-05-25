import mongoose, { Schema, Document } from 'mongoose';

interface IHero extends Document {
    classID: mongoose.Types.ObjectId;
    level: number;
    healthPoints: number;
}

const heroSchema: Schema = new Schema({
    classID: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    level: { type: Number, required: true },
    healthPoints: { type: Number, required: true }
});

const Hero = mongoose.model<IHero>('Hero', heroSchema);

export default Hero;
