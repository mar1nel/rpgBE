import mongoose, { Schema, Document } from 'mongoose';

interface IItem extends Document {
    itemName: string;
    itemType: string;
    rarity: 'A' | 'B' | 'C' | 'F';
    price: number;
    sellDuration: number;
    bonusStats: mongoose.Schema.Types.Mixed;
}

const itemSchema: Schema = new Schema({
    itemName: { type: String, required: true },
    itemType: { type: String, required: true },
    rarity: { type: String, required: true, enum: ['A', 'B', 'C', 'F'] },
    price: { type: Number, required: true },
    sellDuration: { type: Number, required: true },
    bonusStats: { type: mongoose.Schema.Types.Mixed }
});

const Item = mongoose.model<IItem>('Item', itemSchema);

export default Item;
