import { useState } from "react";
import ArrowDown from "./icons/arrow-down";

type SelectProps = {
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  className?: string;         // Para el contenedor principal
  buttonClassName?: string;   // Para el botón
  menuClassName?: string;     // Para el menú desplegable
  optionClassName?: string;   // Para cada opción
};

export default function Select({
  options,
  onSelect,
  placeholder = "Select an option",
  className = "",
  buttonClassName = "",
  menuClassName = "",
  optionClassName = "",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  

  return (
    <div className={`relative inline-block text-left w-64 ${className} flex `}>
      <button
        className={`px-4 py-2 text-white rounded flex items-center gap-2 w-full ${buttonClassName} justify-between`}
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        {selected || placeholder}
        <ArrowDown />
      </button>
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
           rounded shadow absolute left-0 mt-2 w-full
          ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
          ${menuClassName}
        `}
        style={{ zIndex: 10 }}
      >
        <ul className="divide-y divide-gray-200">
          {options.map((option) => (
            <li
              key={option}
              className={`px-4 py-2 hover:bg-red-700 cursor-pointer ${optionClassName} text-white`}
              onClick={() => {
                setSelected(option);
                onSelect(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}