import { useEffect, useState } from "react";
import { Order } from "../../typings";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../features/globalSlice";
import { RootState } from "../../app/store";

export default function OrderList() {
  // const [orders, setOrders] = useState<Order[]>([]);
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.global.orders);
  const user = useSelector((state: RootState) => state.global.user);

  // get orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("http://localhost:8000/dash/getMyOrders/" + user?._id
      , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      // setOrders(data.orders as Order[]);
      // console.log(data);
      dispatch(setOrders(data.orders as Order[]));
      console.log(orders);
    };
    fetchOrders();
  }, [user]);

  return (
    <div className="px-5 w-1/2 max-h-[86vh] overflow-y-auto">
      <h1>Orders</h1>
      {orders?.length > 0 &&
        orders.map((order: Order) => (
          <OrderCard order={order} key={order._id} />
        ))}
    </div>
  );
}
