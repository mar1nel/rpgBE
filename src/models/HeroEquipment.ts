import mongoose, { Schema, Document } from 'mongoose';

interface IHeroEquipment extends Document {
    heroID: mongoose.Types.ObjectId;
    equipmentType: string;
    equipmentID: mongoose.Types.ObjectId;
}

const heroEquipmentSchema: Schema = new Schema({
    heroID: { type: Schema.Types.ObjectId, ref: 'Hero', required: true },
    equipmentType: { type: String, required: true },
    equipmentID: { type: Schema.Types.ObjectId, ref: 'Item', required: true }
});

const HeroEquipment = mongoose.model<IHeroEquipment>('HeroEquipment', heroEquipmentSchema);

export default HeroEquipment;
