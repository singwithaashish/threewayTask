var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Order from "../models/Order";
import User from "../models/User";
import { Room } from "../models/Message";
export const sendHello = (req, res) => {
    try {
        res.status(200).json({ message: "Hello World" });
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to, quantity, pickup, transporter, manufacturerId, transporterId, } = req.body;
        // we can check if the user is a manufacturer or not, but for now we will assume that the user is a manufacturer
        // create new order
        const order = new Order({
            from,
            to,
            quantity,
            pickup,
            transporter,
            status: "pending",
            price: null,
            manufacturerId,
            transporterId,
        });
        const newOrder = yield order.save();
        res
            .status(200)
            .json({ message: "Order added successfully", order: newOrder });
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
export const updatePrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, price } = req.body;
        const order = yield Order.findById(id);
        if (!order)
            return res.status(400).json({ message: "Invalid order id" });
        order.price = price;
        order.status = "quoted";
        yield order.save();
        res.status(200).json({ message: "Price updated successfully" });
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
export const acceptQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const order = yield Order.findById(id);
        if (!order)
            return res.status(400).json({ message: "Invalid order id" });
        order.status = "approved";
        yield order.save();
        res.status(200).json({ message: "Order approved successfully" });
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
export const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, status } = req.body;
        const order = yield Order.findById(id);
        if (!order)
            return res.status(400).json({ message: "Invalid order id" });
        order.status = status;
        yield order.save();
        res.status(200).json({ message: "Status updated successfully" });
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
export const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order.find();
        console.log(orders);
        res.status(200).json({ orders });
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
export const getOrderForUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const orders = yield Order.find({
            $or: [{ manufacturerId: id }, { transporterId: id }],
        });
        res.status(200).json({ orders });
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
export const getAllTransporters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // all users with isManufacturer = false
        const transporters = yield User.find({ isManufacturer: false });
        res.status(200).json({ transporters });
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
export const getRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // // create a room for the two users if it doesn't exist
    // if (from === to)
    //   throw new Error("Invalid user id");
    // // check if room existsgetMessages
    // let room = await Room.findOne({ users: { $all: [from, to] } });
    // if (!room) {
    //   // create new room
    //   room = new Room({
    //     users: [from, to],
    //     messages: [],
    //   });
    //   await room.save();
    // }
    // return room;
    try {
        const { from, to } = req.body;
        // create a room for the two users if it doesn't exist
        if (from === to)
            return res.status(400).json({ message: "Invalid user id" });
        // check if room exists
        let room = yield Room.findOne({ users: { $all: [from, to] } });
        if (!room) {
            // create new room
            room = new Room({
                users: [from, to],
                messages: [],
            });
            yield room.save();
        }
        return res.status(200).json({ room });
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
