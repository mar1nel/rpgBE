const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    profileNickname: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    solanaAddress: { type: String, required: true, unique: true },
    profileEmail: { type: String, required: true },
    class: { type: String, required: true },
    money: { type: Number, default: 0 },
    profilePicture: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);

