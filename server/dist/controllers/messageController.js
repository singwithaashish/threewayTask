var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Message, Room } from "../models/Message";
export const sendMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to, content } = req.body;
        // create a room for the two users if it doesn't exist
        if (from === to)
            return res.status(400).json({ message: "Invalid user id" });
        // check if room exists
        let room = yield Room.findOne({ users: { $all: [from, to] } });
        // create new message
        const message = new Message({
            from,
            to,
            content,
        });
        const newMessage = yield message.save();
        if (room) {
            // add message to existing room
            room.messages.push(newMessage._id);
        }
        else {
            // create new room and add message
            room = new Room({
                users: [from, to],
                messages: [newMessage._id],
            });
        }
        yield room.save();
        req.io.emit('message', content);
        return res.status(200).json({ message: "Message sent successfully" });
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error: " + e.message });
    }
});
export const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to } = req.body;
        // create a room for the two users if it doesn't exist
        if (from === to)
            return res.status(400).json({ message: "Invalid user id" });
        // check if room exists
        const room = yield Room.findOne({ users: { $all: [from, to] } });
        if (!room)
            return res.status(200).json({ messages: [] });
        // get messages
        const messages = yield Message.find({ _id: { $in: room.messages } });
        return res.status(200).json({ messages });
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error: " + e.message });
    }
});
