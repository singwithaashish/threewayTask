import React from "react";
import { Order } from "../../typings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setSelectedOrder } from "../../features/globalSlice";

export default function OrderCard({ order }: { order: Order }) {
  const selectedOrder = useSelector(
    (state: RootState) => state.global.selectedOrder
  );
  const user = useSelector((state: RootState) => state.global.user);
  const dispatch = useDispatch();

  const [price, setPrice] = React.useState<number>(0);

  const submitPrice = async () => {
    const res = await fetch("http://localhost:8000/dash/submitPrice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body: JSON.stringify({
        orderId: order._id,
        price: price,
      }),
    });

    const data = await res.json();
    console.log(data);
  };

  const acceptQuote = async () => {
    const res = await fetch("http://localhost:8000/dash/acceptQuote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body: JSON.stringify({
        orderId: order._id,
      }),
    });

    const data = await res.json();
    console.log(data);
  };
  return (
    <div
      className={
        "bg-white shadow-lg rounded-lg px-4 py-6 mb-2 " +
        (selectedOrder === order && " border border-l-primary ")
      }
      onClick={() => dispatch(setSelectedOrder(order))}
    >
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
        <div>
          {/* here, if user is manufacturer, show pending quote, else show input with "select a price" */}
          <p className="text-gray-500">Price</p>
          {order.status === "pending" ? (
            user?.isManufacturer ? (
              <p className="text-gray-900 font-bold">Awaiting Quote</p>
            ) : (
              <form onSubmit={submitPrice} className="flex flex-col">
                <input
                  type="number"
                  className="text-gray-900 font-bold w-24"
                  placeholder="Select a price"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
                <button className="text-gray-900 bg-primary font-bold">
                  Submit
                </button>
              </form>
            )
          ) : order.status === "Quoted" ? (
            user?.isManufacturer ? (
              <button onClick={acceptQuote} className="text-gray-900 font-bold">Accept Quote</button>
            ) : (
              <p className="text-gray-900 font-bold">Awaiting Acceptance</p>
            )
          ) : (
            <p className="text-gray-900 font-bold">{order.price}</p>

            // <p className="text-gray-900 font-bold">{order.price}</p>
          )}
        </div>
      </div>
    </div>
  );
}
