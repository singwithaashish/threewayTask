import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import LabeledInput from "../Common/LabeledInput";
import MyButton from "../Common/MyButton";
import { useDispatch } from "react-redux";
import { setOrders } from "../../features/globalSlice";

export default function CreateOrderForm() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [pickup, setPickup] = useState<string>("");
  const [transporter, setTransporter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      alert(data.message);
      return;
    }
    console.log(data.order);
    // dispatch(setOrders(data.orders));

  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Create Your Order
            </h3>
            {/* <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput id="email" placeholder="name@company.com" required />
            </div> */}
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
            <LabeledInput
              label="Transporter"
              value={transporter}
              onChange={(e) => setTransporter(e.target.value)}
              placeholder="Transporter"
              id="transporter"
              type="text"
              required
            />
            <MyButton loading={false} text="Create Order" />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
