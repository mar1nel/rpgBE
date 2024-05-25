import mongoose, { Schema, Document } from 'mongoose';

interface IEnemy extends Document {
    enemyName: string;
    enemyLevel: number;
    enemyCost: number;
    enemyFightDuration: number;
    enemyStats: string;
    baseMoneyReward: number;
    baseExpReward: number;
    lootDropReward: mongoose.Schema.Types.Mixed;
}

const enemySchema: Schema = new Schema({
    enemyName: { type: String, required: true },
    enemyLevel: { type: Number, required: true },
    enemyCost: { type: Number, required: true },
    enemyFightDuration: { type: Number, required: true },
    enemyStats: { type: String, required: true },
    baseMoneyReward: { type: Number, required: true },
    baseExpReward: { type: Number, required: true },
    lootDropReward: { type: mongoose.Schema.Types.Mixed, required: true }
});

const Enemy = mongoose.model<IEnemy>('Enemy', enemySchema);

export default Enemy;
