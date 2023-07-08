import { Spinner } from "flowbite-react";

interface MyButtonProps {
  loading: boolean;
  text?: string;
}

export default function MyButton({ loading, text= "Sign in" }: MyButtonProps) {
  return (
    <button
      type="submit"
      className=" bg-primary hover:opacity-80 duration-150 p-2 text-white rounded"
    >
      {loading ? <Spinner /> : text}
    </button>
  );
}
