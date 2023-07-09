import express from "express";
import { authMiddleware } from "../utils/authMiddleware";
import { addOrder, sendHello, updatePrice, updateStatus, getOrders, getAllTransporters, getRoom, acceptQuote, getOrderForUserId, } from "../controllers/dashController";
import { getMessages, sendMessages } from "../controllers/messageController";
const router = express.Router();
router.get("/", authMiddleware, sendHello);
router.post("/addOrder", authMiddleware, addOrder);
router.post("/updatePrice", authMiddleware, updatePrice);
router.post("/acceptQuote", authMiddleware, acceptQuote);
router.post("/updateStatus", authMiddleware, updateStatus);
router.get("/getOrders", authMiddleware, getOrders);
router.get("/getMyOrders/:id", authMiddleware, getOrderForUserId);
router.get("/getRoom", authMiddleware, getRoom);
router.get("/getAllTransporters", authMiddleware, getAllTransporters);
/* for Message */
router.post("/sendMessages", authMiddleware, sendMessages);
router.post("/getMessages", authMiddleware, getMessages);
export default router;
