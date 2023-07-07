import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { classes } from "../../utils/constants";
import LabeledInput from "../../components/Common/LabeledInput";

function Register() {
  const [isManufacturer, setIsManufacturer] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // console.log(isManufacturer, name, email, password, confPassword);
    const res = await fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isManufacturer,
        name,
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log(data);
    setLoading(false);
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 min-w-[50vw] bg-gray-50 p-5 rounded"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign up to our platform
          </h3>
          <div className="flex items-center p-1 gap-x-1 rounded bg-white shadow ">
            <p className="text-gray-500">I am a</p>
            <p
              className={
                isManufacturer
                  ? classes.selectedUserType
                  : classes.unselectedUserType
              }
              onClick={() => setIsManufacturer(true)}
            >
              Manufacturer
            </p>
            <p
              className={
                !isManufacturer
                  ? classes.selectedUserType
                  : classes.unselectedUserType
              }
              onClick={() => setIsManufacturer(false)}
            >
              Transporter
            </p>
          </div>
        </div>
        <LabeledInput
          label="Your name"
          placeholder="John Doe"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <LabeledInput
          label="Your email"
          placeholder="example@company.com"
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LabeledInput
          label="Your password"
          placeholder="********"
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LabeledInput
          label="Confirm password"
          placeholder="********"
          id="confPassword"
          type="password"
          required
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
        />

        <button
          type="submit"
          className=" bg-primary hover:opacity-80 duration-150 p-2 text-white rounded"
        >
          {loading ? "Loading..." : "Create account"}
        </button>
        <div className="flex justify-between text-sm font-medium text-gray-500">
          Already registered?&nbsp;
          <a href="/login" className="text-primary hover:underline">
            login to your account
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
