import mongoose, { Schema } from 'mongoose';
const OrderSchema = new Schema({
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
export default mongoose.model('Order', OrderSchema);
