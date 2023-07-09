import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import LabeledInput from "../Common/LabeledInput";
import MyButton from "../Common/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../features/globalSlice";
import { User } from "../../typings";
import { RootState } from "../../app/store";

export default function CreateOrderForm() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  return (
    <>
      <Button onClick={() => props.setOpenModal("form-elements")}>
        Create Order
      </Button>
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <TheFrom setOpenModal={setOpenModal}/>
        </Modal.Body>
      </Modal>
    </>
  );
}

const TheFrom = ({setOpenModal} : {
  setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>
}) => {
  const user = useSelector((state: RootState) => state.global.user);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [pickup, setPickup] = useState<string>("");
  const [transporter, setTransporter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const orders = useSelector((state: RootState) => state.global.orders);


  const [allTransporters, setAllTransporters] = useState<User[]>([]);

  useEffect(() => {
    setPickup(user?.address || "");
    const fetchTransporters = async () => {
      const res = await fetch("http://localhost:8000/dash/getAllTransporters", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setAllTransporters(data.transporters as User[]);
    };
    fetchTransporters();

  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(from, to, quantity, pickup, transporter, user?._id, transporter.toString());
    const res = await fetch("http://localhost:8000/dash/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        from,
        to,
        quantity,
        pickup,
        transporter,
        manufacturerId: user?._id,
        transporterId: transporter.toString(),
      }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      alert(data.message);
      return;
    }
    console.log(data.order);
    dispatch(setOrders(
      [...orders, data.order]
    ));
    setOpenModal(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Create Your Order
      </h3>
      <LabeledInput
        label="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="From"
        id="from"
        type="text"
        required
      />

      <LabeledInput
        label="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To"
        id="to"
        type="text"
        required
      />
      <LabeledInput
        label="Quantity"
        value={quantity.toString()}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        placeholder="Quantity"
        id="quantity"
        type="number"
        required
      />
      <LabeledInput
        label="Pickup"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        placeholder="Pickup"
        id="pickup"
        type="text"
        required
      />
      {/* drop down menu to select transporter by name and email */}
      <div className="flex flex-col">
        <Label htmlFor="transporter" className="text-gray-700">
          Transporter
        </Label>
        <select
          id="transporter"
          name="transporter"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          onChange={(e) => setTransporter(e.target.value.toString())}
        >
          <option value="">Select Transporter</option>
          {allTransporters.map((transporter : User) => (
            <option key={transporter._id} value={transporter._id || ""}>
              {transporter.name || "No Name"}
            </option>
          ))}
        </select>
      </div>
      <MyButton loading={false} text="Create Order" />
    </form>
  );
};
