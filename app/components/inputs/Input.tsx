"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BsCurrencyEuro } from "react-icons/bs";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BsCurrencyEuro
          size={20}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-ptgGrey"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        type={type}
        placeholder=" "
        className={`
        peer 
        w-full
        p-4
        pt-6
        font-light
        bg-ptgBeige
        rounded-md 
        border-2 
        border-ptgGrey 
        focus:outline-none 
        focus:border-ptgBlue 
        transition disabled:opacity-70 
        disabled:cursor-not-allowed 
        disabled:select-none
        ${formatPrice ? "pl-9" : "pl-4"}
        ${errors[id] && "border-ptgRed"}
        ${errors[id] && "focus:border-ptgRed"}
        `}
      ></input>
      <label
        htmlFor={id}
        className={`
        absolute
        text-md
        duration-150
        transform
        -translate-y-1/2
        top-5
        z-10
        origin-[0]
        ${formatPrice ? "left-9" : "left-4"}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:-translate-y-4
        ${errors[id] ? "text-ptgRed" : "text-ptgGrey text-light"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
