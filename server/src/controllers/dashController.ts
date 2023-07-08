import { Request, Response } from "express";
import Order from "../models/Order";

export const sendHello = (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Hello World" });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addOrder = async (req: Request, res: Response) => {
  try {
    const { from, to, quantity, pickup, transporter } = req.body;

    // we can check if the user is a manufacturer or not, but for now we will assume that the user is a manufacturer

    // create new order
    const order = new Order({
      from,
      to,
      quantity,
      pickup,
      transporter,
      status : "pending",
      price: null,
    });
    const newOrder = await order.save();

    res.status(200).json(
      { message: "Order added successfully", order: newOrder }
    );
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePrice = async (req: Request, res: Response) => {
  try {
    const { id, price } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(400).json({ message: "Invalid order id" });

    order.price = price;
    await order.save();

    res.status(200).json({ message: "Price updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(400).json({ message: "Invalid order id" });

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Status updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    console.log(orders);
    res.status(200).json({ orders });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOrdersByTransporter = async (req: Request, res: Response) => {
  try {
    const { transporter } = req.params;
    const orders = await Order.find({ transporter });
    res.status(200).json({ orders });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOrdersByManufacturer = async (req: Request, res: Response) => {
  try {
    const { manufacturer } = req.params;
    const orders = await Order.find({ manufacturer });
    res.status(200).json({ orders });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
