import mongoose, { Schema } from 'mongoose';
const MessageSchema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
const RoomSchema = new Schema({
    users: [{ type: String, required: true }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }], // Reference to Message documents
});
export const Message = mongoose.model('Message', MessageSchema);
export const Room = mongoose.model('Room', RoomSchema);
