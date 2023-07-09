import { Server as SocketIOServer } from "socket.io";

declare namespace Express {
  export interface Request {
    io: SocketIOServer;
  }
}
