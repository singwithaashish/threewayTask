import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  isManufacturer: Boolean;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    isManufacturer: { type: Boolean, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        select: false, // it will not be returned by default when we query for users
    },
});

export default mongoose.model<IUser>('User', UserSchema);
