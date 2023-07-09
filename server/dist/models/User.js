import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true },
    isManufacturer: { type: Boolean, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: false },
    password: {
        type: String,
        required: true,
        select: false, // it will not be returned by default when we query for users
    },
});
export default mongoose.model('User', UserSchema);
