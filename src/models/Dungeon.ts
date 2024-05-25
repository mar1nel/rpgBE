import mongoose, { Schema, Document } from 'mongoose';

interface IDungeon extends Document {
    dungeonLevel: number;
}

const dungeonSchema: Schema = new Schema({
    dungeonLevel: { type: Number, required: true }
});

const Dungeon = mongoose.model<IDungeon>('Dungeon', dungeonSchema);

export default Dungeon;
