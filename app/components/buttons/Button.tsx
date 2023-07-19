"use client";

import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  value: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  large?: boolean;
  color?: string;
  disabled?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  value,
  color = "Blue",
  large = false,
  disabled,
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
      className={`${
        large ? "pt-4 pb-3 px-6" : "p-2"
      } flex items-center justify-center rounded-lg border-2 border-ptgGrey  ${
        color && btnColor
      } transition hover:bg-ptgOrange leading-none text-center disabled:opacity-70 disabled:cursor-not-allowed disabled:select-none`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{Icon && <Icon size={18} className="" />}</span>
      <span className="my-auto">{value}</span>
    </button>
  );
};

export default Button;
