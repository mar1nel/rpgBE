import mongoose, { Schema, Document } from 'mongoose';

interface IProfile extends Document {
    profileNickname: string;
    passwordHash: string;
    solanaAddress: string;
    profileEmail: string;
    class: string;
    money: number;
    profilePicture: string;
}

const profileSchema: Schema = new Schema({
    profileNickname: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    solanaAddress: { type: String, required: true, unique: true },
    profileEmail: { type: String, required: true },
    class: { type: String, required: true },
    money: { type: Number, default: 0 },
    profilePicture: { type: String, required: true }
}, { timestamps: true });

const Profile = mongoose.model<IProfile>('Profile', profileSchema);

export default Profile;
