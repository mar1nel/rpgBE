import mongoose, { Schema, Document } from 'mongoose';

interface IProfile extends Document {
    profileNickname: string;
    solanaAddress: string;
    profileClass: number;
    money: number;
    level: number;
    healthPoints: number;
    experiencePoints: number;
    dungeonLevel: number;
    inventory: {
        itemId: number;
        quantity: number;
        equipped: boolean;
        unlocked: boolean;
    }[];
}

const profileSchema: Schema = new Schema({
    profileNickname: { type: String, required: true, unique: true },
    solanaAddress: { type: String, required: true, unique: true },
    profileClass: { type: Number, required: true },
    money: { type: Number, default: 100 },
    level: { type: Number, default: 0 },
    healthPoints: { type: Number, default: 100 },
    experiencePoints: { type: Number, default: 0 },
    dungeonLevel: { type: Number, default: 1 },
    inventory: [{
        itemId: { type: Number, required: true },
        quantity: { type: Number, required: true },
        equipped: { type: Boolean, default: false },
        unlocked: { type: Boolean, default: false }
    }]
}, { timestamps: true });

const Profile = mongoose.model<IProfile>('Profile', profileSchema);

export default Profile;
