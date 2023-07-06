import { Label, TextInput } from "flowbite-react";

interface LabeledInputProps {
    label: string;
    placeholder: string;
    id: string;
    type?: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LabeledInput({
    label,
    placeholder,
    id,
    type = "text",
    required = false,
    value,
    onChange,
} : LabeledInputProps) {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} />
      </div>
      <TextInput id={id} type={type} placeholder={placeholder} required={required} value={value} onChange={onChange} />
    </div>
  );
}
