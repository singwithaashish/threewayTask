import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IOrder extends Document {
    from: string; // address
    to: string; // address
    quantity: number;
    pickup: string; 
    // transporter is an user with all the details
    transporter: Types.ObjectId; // userid
    status: string; // enum
    price: number | null;
    createdAt: Date;
    manufacturerId: string;
    transporterId: string;
}

const OrderSchema: Schema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    quantity: { type: Number, required: true },
    pickup: { type: String, required: true },
    transporter: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, required: true },
    price: { type: Number, default: null },
    manufacturerId: { type: String, required: true },
    transporterId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
