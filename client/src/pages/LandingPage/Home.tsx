import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/globalSlice";
import { User } from "../../typings";
import Header from "../../components/Layout/Header";
import OrderList from "../../components/Order/OrderList";
import { RootState } from "../../app/store";
import ChatList from "../../components/Chat/ChatList";

function Home() {
  const dispatch = useDispatch();
  // fetch the user and set in redux
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    const fetchUser = async () => {
      const res = await fetch("http://localhost:8000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      const data = await res.json();
      const nuser: User = {
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        isManufacturer: data.user.isManufacturer,
        address: data.user.address,
      };
      dispatch(setUser(nuser));
      // console.log(user?.name)
    };
    fetchUser();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gray-200">
      <Header />
      <div className="flex">

      <OrderList />
      <ChatList />
      </div>
    </div>
  );
}

export default Home;
