import { useEffect, useState } from "react";
import { Order } from "../../typings";
import OrderCard from "./OrderCard";

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);

  // get orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("http://localhost:8000/dash/getOrders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setOrders(data.orders as Order[]);
    };
    fetchOrders();
  }, []);

  return (
    <div className="px-5">
      <h1>Orders</h1>
      {orders.length > 0 &&
        orders.map((order: Order) => (
          <OrderCard order={order} key={order._id} />
        ))}
    </div>
  );
}
