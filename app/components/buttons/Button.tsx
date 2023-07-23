"use client";

import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  value: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  large?: boolean;
  color?: string;
  disabled?: boolean;
  full?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  value,
  color = "Blue",
  large = false,
  disabled,
  full,
  icon: Icon,
}) => {
  const btnColor =
    color === "Blue"
      ? "bg-ptgBlue"
      : color === "Orange"
      ? "bg-ptgOrange"
      : color === "Grey"
      ? "bg-ptgGrey"
      : color === "Green"
      ? "bg-ptgGreen"
      : color === "Red" && "bg-ptgRed";
  return (
    <button
      className={`${large ? "pt-4 pb-3 px-6" : "p-4"} ${
        Icon && "pl-10"
      } ${Icon && value === "" && 'p-3 '}flex items-center justify-center rounded-lg border-2 border-ptgGrey  ${
        color && btnColor
      } relative transition hover:opacity-80 leading-none text-center disabled:opacity-70 disabled:cursor-not-allowed disabled:select-none ${
        full && "w-full"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="absolute left-4">
        {Icon && <Icon size={18} className="" />}
      </span>
      <span className="my-auto font-bold">{value}</span>
    </button>
  );
};

export default Button;
