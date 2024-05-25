import mongoose, { Schema, Document } from 'mongoose';

interface IClasses extends Document {
    name: string;
    def: number;
    spd: number;
    mna: number;
    crt: number;
}

const classSchema: Schema = new Schema({
    name: { type: String, required: true },
    def: { type: Number, required: true },
    spd: { type: Number, required: true },
    mna: { type: Number, required: true },
    crt: { type: Number, required: true }
});

const Classes = mongoose.model<IClasses>('Class', classSchema);

export default Classes;
