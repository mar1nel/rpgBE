import mongoose, { Schema, Document } from 'mongoose';

interface IEnemyStat {
    type: string;
    value: number;
}

interface IEnemy extends Document {
    enemyName: string;
    enemyLevel: number;
    enemyCost: number;
    enemyFightDuration: number;
    enemyStats: IEnemyStat[];
    baseMoneyReward: number;
    baseExpReward: number;
    lootDropReward: { itemId: number; quantity: number };
    imageUrl: string;
}

const enemySchema: Schema = new Schema({
    enemyName: { type: String, required: true },
    enemyLevel: { type: Number, required: true },
    enemyCost: { type: Number, required: true },
    enemyFightDuration: { type: Number, required: true },
    enemyStats: [{ type: { type: String, required: true }, value: { type: Number, required: true } }],
    baseMoneyReward: { type: Number, required: true },
    baseExpReward: { type: Number, required: true },
    lootDropReward: { itemId: { type: Number, required: true }, quantity: { type: Number, required: true } },
    imageUrl: { type: String, required: true }
});

const Enemy = mongoose.model<IEnemy>('Enemy', enemySchema);

export default Enemy;
