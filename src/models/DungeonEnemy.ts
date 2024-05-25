import mongoose, { Schema, Document } from 'mongoose';

interface IDungeonEnemy extends Document {
    dungeonID: mongoose.Types.ObjectId;
    enemyID: mongoose.Types.ObjectId;
}

const dungeonEnemySchema: Schema = new Schema({
    dungeonID: { type: Schema.Types.ObjectId, ref: 'Dungeon', required: true },
    enemyID: { type: Schema.Types.ObjectId, ref: 'Enemy', required: true }
});

const DungeonEnemy = mongoose.model<IDungeonEnemy>('DungeonEnemy', dungeonEnemySchema);

export default DungeonEnemy;
