import { Label, Checkbox } from "flowbite-react";
import { useState } from "react";
import LabeledInput from "../../components/Common/LabeledInput";
import MyButton from "../../components/Common/MyButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`${import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:8000"}/auth/me`)
    setLoading(true);
    const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:8000"}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      alert(data.message);
      setLoading(false);
      return;
    }
    console.log(data);
    localStorage.setItem("token", data.token);
    setLoading(false);
    // now we can redirect to home page
    window.location.href = "/";
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 min-w-[50vw] bg-gray-50 p-5 rounded"
      >
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to our platform
        </h3>
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
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
        </div>
        {/* <button
          type="submit"
          className=" bg-primary hover:opacity-80 duration-150 p-2 text-white rounded"
        >
          {loading ? <Spinner /> : "Sign in"}
        </button> */}
        <MyButton loading={loading} />

        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?&nbsp;
          <a href="/register" className="text-primary hover:underline ">
            Create account
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
