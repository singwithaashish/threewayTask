import { Request, Response } from "express";
import { Message, Room } from "../models/Message";

export const sendMessages = async (req: Request, res: Response) => {
  try {
    const { from, to, content } = req.body;

    // create a room for the two users if it doesn't exist
    if (from === to)
      return res.status(400).json({ message: "Invalid user id" });

    // check if room exists
    let room = await Room.findOne({ users: { $all: [from, to] } });

    // create new message
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

    req.io.emit('message', content);

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (e: any) {
    res.status(500).json({ message: "Internal Server Error: " + e.message });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.body;

    // create a room for the two users if it doesn't exist
    if (from === to)
      return res.status(400).json({ message: "Invalid user id" });

    // check if room exists
    const room = await Room.findOne({ users: { $all: [from, to] } });

    if (!room) return res.status(200).json({ messages: [] });

    // get messages
    const messages = await Message.find({ _id: { $in: room.messages } });

    return res.status(200).json({ messages });
  } catch (e: any) {
    res.status(500).json({ message: "Internal Server Error: " + e.message });
  }
};
