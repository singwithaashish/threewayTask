import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMessage extends Document {
    from: string; // userid
    to: string; // userid
    content: string;
    createdAt: Date;
}

export interface IRoom extends Document {
    users: string[]; // userid
    messages: Types.ObjectId[]; // messageid
}

const MessageSchema: Schema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const RoomSchema: Schema = new Schema({
    users: [{ type: String, required: true }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }], // Reference to Message documents
});

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
export const Room = mongoose.model<IRoom>('Room', RoomSchema);
