import { Server } from "socket.io"
import { Message, Room } from "../models/Message";

const socketSetup = (io: Server) => {
    io.on("connection", (socket) => {
        console.log("A user connected: " + socket.id);
  
        // instead of providing room id, we can provide the user ids
        socket.on("joinRoom", async (users) => {
  
          const {from, to} = users;
          if (!users.from) return;
          // create a room for the two users if it doesn't exist
          let room = await Room.findOne({ users: { $all: [from, to] } });
  
          if (!room) {
            // create new room
            room = new Room({
              users: [from, to],
              messages: [],
            });
            await room.save();
          }
  
          // console.log(room);
          socket.join(room.id);
  
          let roomEntity = await Room.findOne({ _id: room }).populate("messages");
          // console.log(roomEntity);
          if (roomEntity) {
            // let chatHistory = roomEntity.messages.map((message: any) => message.content);
            socket.emit("chatHistory", roomEntity.messages);
          }
        });
  
        socket.on("message", async (data) => {
          try {
            const { from, to, content } = data;
            // check if room exists
            let room = await Room.findOne({ users: { $all: [from, to] } });
            const message = new Message({
              from,
              to,
              content,
            });
            const newMessage = await message.save();
  
            if (room) {
              // add message to existing room
              room.messages.push(newMessage._id);
            } else {
              // create new room and add message
              room = new Room({
                users: [from, to],
                messages: [newMessage._id],
              });
            }
            await room.save();
            // send to everyone in the room
            // console.log(newMessage, room?._id);
            io.in(room.id).emit("message", newMessage);
          } catch (err) {
            console.log(err);
          }
        });
      });
}

export default socketSetup;