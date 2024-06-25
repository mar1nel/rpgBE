import mongoose, { Schema, Document } from 'mongoose';
import { IItem } from './Item'; // Adjust the import path according to your project structure

interface IHeroEquipment extends Document {
    heroID: mongoose.Types.ObjectId;
    equipmentType: string;
    equipmentID: mongoose.Types.ObjectId | IItem; // Reference to Item model
}

const heroEquipmentSchema: Schema = new Schema({
    heroID: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    equipmentType: { type: String, required: true },
    equipmentID: { type: Schema.Types.ObjectId, ref: 'Item', required: true } // Ref to Item
});

const HeroEquipment = mongoose.model<IHeroEquipment>('HeroEquipment', heroEquipmentSchema);

export default HeroEquipment;
