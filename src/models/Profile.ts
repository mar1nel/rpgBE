import mongoose, { Schema, Document } from 'mongoose';

interface IProfile extends Document {
    profileNickname: string;
    // passwordHash: string;
    solanaAddress: string;
    class: string;
    money: number;
}

const profileSchema: Schema = new Schema({
    profileNickname: { type: String, required: true, unique: true },
    // passwordHash: { type: String, required: true },
    solanaAddress: { type: String, required: true, unique: true },
    class: { type: String, required: true },
    money: { type: Number, default: 0 },
}, { timestamps: true });

const Profile = mongoose.model<IProfile>('Profile', profileSchema);

export default Profile;