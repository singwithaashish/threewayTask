import express from "express";
import { authMiddleware } from "../utils/authMiddleware";
import {
  addOrder,
  sendHello,
  updatePrice,
  updateStatus,
  getOrders,
  getOrdersByTransporter,
  getOrdersByManufacturer,
} from "../controllers/dashController";

const router = express.Router();

router.get("/", authMiddleware, sendHello);
router.post("/addOrder", authMiddleware, addOrder);
router.post("/updatePrice", authMiddleware, updatePrice);
router.post("/updateStatus", authMiddleware, updateStatus);
router.get("/getOrders", authMiddleware, getOrders);
router.get(
  "/getOrdersByTransporter/:transporter",
  authMiddleware,
  getOrdersByTransporter
);
router.get(
  "/getOrdersByManufacturer/:manufacturer",
  authMiddleware,
  getOrdersByManufacturer
);

export default router;
