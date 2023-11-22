interface InputComponentProps {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function InputComponent({
  id,
  type,
  label,
  placeholder,
  value,
  onChange,
}: InputComponentProps) {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block mb-2 text-lg font-bold text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-purple-500 block w-full p-2.5"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
}
