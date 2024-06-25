import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
    itemId: number;
    itemName: string;
    itemType: string; // Helmet, Pants, Body, Weapon
    rarity: 'A' | 'B' | 'C' | 'F';
    price: number;
    sellDuration: number;
    bonusStats: mongoose.Schema.Types.Mixed;
    stackable: boolean;
    quantity: number;
    imageUrl: string;
}

const itemSchema: Schema = new Schema({
    itemId: { type: Number, required: true, unique: true },
    itemName: { type: String, required: true, unique: true },
    itemType: { type: String, required: true },
    rarity: { type: String, required: true, enum: ['A', 'B', 'C', 'F'] },
    price: { type: Number, required: true },
    sellDuration: { type: Number, required: true },
    bonusStats: { type: mongoose.Schema.Types.Mixed },
    stackable: { type: Boolean, default: false },
    quantity: { type: Number, default: 1 }, // Number of items in a stack
    imageUrl: { type: String, required: true }
});

const Item = mongoose.model<IItem>('Item', itemSchema);

export default Item;
