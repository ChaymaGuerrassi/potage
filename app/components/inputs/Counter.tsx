"use client";

import { useCallback } from "react";
import { PiMinusBold, PiPlusBold } from "react-icons/pi";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onRemove = useCallback(() => {
    if (value === 1) return;
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="text-sm text-gray-400">{subtitle}</div>
      </div>
      <div className="flex items-center gap-4">
        <div
          onClick={onRemove}
          className="w-8 h-8 rounded-full border-2 border-ptgGrey flex items-center justify-center cursor-pointer text-ptgGrey bg-ptgOrange hover:opacity-70 transition"
        >
          <PiMinusBold size={18} />
        </div>
        <div className="text-xl font-medium w-10 text-center">{value}</div>
        <div
          onClick={onAdd}
          className="w-8 h-8 rounded-full border-2 border-ptgGrey flex items-center justify-center cursor-pointer text-ptgGrey bg-ptgOrange hover:opacity-70 transition"
        >
          <PiPlusBold size={18} />
        </div>
      </div>
    </div>
  );
};

export default Counter;
