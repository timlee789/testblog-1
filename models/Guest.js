import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {type: String, required: true },
    email: {type: String, required: true },
    tel: {type: String, required: true },
    password: {type: String, required: true },
});
const Guest = mongoose.models.Guest || mongoose.model('Guest', guestSchema);
export default Guest;