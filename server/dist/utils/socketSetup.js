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
const socketSetup = (io) => {
    io.on("connection", (socket) => {
        console.log("A user connected: " + socket.id);
        // instead of providing room id, we can provide the user ids
        socket.on("joinRoom", (users) => __awaiter(void 0, void 0, void 0, function* () {
            const { from, to } = users;
            if (!users.from)
                return;
            // create a room for the two users if it doesn't exist
            let room = yield Room.findOne({ users: { $all: [from, to] } });
            if (!room) {
                // create new room
                room = new Room({
                    users: [from, to],
                    messages: [],
                });
                yield room.save();
            }
            // console.log(room);
            socket.join(room.id);
            let roomEntity = yield Room.findOne({ _id: room }).populate("messages");
            // console.log(roomEntity);
            if (roomEntity) {
                // let chatHistory = roomEntity.messages.map((message: any) => message.content);
                socket.emit("chatHistory", roomEntity.messages);
            }
        }));
        socket.on("message", (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { from, to, content } = data;
                // check if room exists
                let room = yield Room.findOne({ users: { $all: [from, to] } });
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
                // send to everyone in the room
                // console.log(newMessage, room?._id);
                io.in(room.id).emit("message", newMessage);
            }
            catch (err) {
                console.log(err);
            }
        }));
    });
};
export default socketSetup;
