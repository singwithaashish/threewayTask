import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
    from: string; // address
    to: string; // address
    quantity: number;
    pickup: string; // userid
    transporter: string; // userid
    status: string; // enum
    price: number | null;
    createdAt: Date;
}

const OrderSchema: Schema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    quantity: { type: Number, required: true },
    pickup: { type: String, required: true },
    transporter: { type: String, required: true },
    status: { type: String, required: true },
    price: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
