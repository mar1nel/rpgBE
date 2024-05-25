import mongoose, { Schema, Document } from 'mongoose';

interface IFight extends Document {
    heroFightId: mongoose.Types.ObjectId;
    enemyFightId: mongoose.Types.ObjectId;
    fightDuration: number;
    status: string;
    result: string;
    startTime: Date;
}

const fightSchema: Schema = new Schema({
    heroFightId: { type: Schema.Types.ObjectId, ref: 'Hero', required: true },
    enemyFightId: { type: Schema.Types.ObjectId, ref: 'Enemy', required: true },
    fightDuration: { type: Number, required: true },
    status: { type: String, required: true },
    result: { type: String, required: true },
    startTime: { type: Date, required: true }
});

const Fight = mongoose.model<IFight>('Fight', fightSchema);

export default Fight;
