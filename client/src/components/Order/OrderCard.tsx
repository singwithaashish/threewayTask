import React from "react";
import { Order } from "../../typings";

export default function OrderCard({ order }: { order: Order }) {
  return (
    <div className="bg-white shadow-lg rounded-lg px-4 py-6 mb-2 w-1/2">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">Order ID</p>
          <p className="text-gray-900 font-bold">{order._id}</p>
        </div>
        <div>
          <p className="text-gray-500">Status</p>
          <p className="text-gray-900 font-bold">{order.status}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-gray-500">Manufacturer</p>
          <p className="text-gray-900 font-bold">{order.to}</p>
        </div>
        <div>
          <p className="text-gray-500">Transporter</p>
          <p className="text-gray-900 font-bold">{order.from}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-gray-500">Quantity</p>
          <p className="text-gray-900 font-bold">{order.quantity}</p>
        </div>
        <div>
          <p className="text-gray-500">Pickup</p>
          <p className="text-gray-900 font-bold">{order.pickup}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-gray-500">Transporter</p>
          <p className="text-gray-900 font-bold">{order.transporter}</p>
        </div>
        <div></div>
      </div>
    </div>
  );
}
