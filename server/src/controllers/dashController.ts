import { Request, Response } from "express";

export const sendHello = (req: Request, res: Response) => {
    try{
        res.status(200).json({ message: 'Hello World' });
    }
    catch(e){
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
