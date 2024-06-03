import mongoose, { Schema, Document } from 'mongoose';

interface IProfile extends Document {
    profileNickname: string;
    solanaAddress: string;
    profileClass: number;
    money: number;
    level: number;
    healthPoints: number;
}

const profileSchema: Schema = new Schema({
    profileNickname: { type: String, required: true, unique: true },
    solanaAddress: { type: String, required: true, unique: true },
    profileClass: { type: String, required: true },
    money: { type: Number, default: 100 },
    level: { type: Number, default: 0 },
    healthPoints: { type: Number, default: 100 },

}, { timestamps: true });

const Profile = mongoose.model<IProfile>('Profile', profileSchema);

export default Profile;