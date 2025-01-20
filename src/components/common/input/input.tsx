"use client"

import { cn } from "@/lib/utils";
import { ChangeEvent, FC } from "react";

interface InputProps {
  type?: "text" | "number" | "email" | "password";
  label?: string;
  value: string;
  name: string;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  autoFocus?: boolean
}

const Input: FC<InputProps> = ({
  type = "text",
  label,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
  className,
  autoFocus,
}) => {
  return (
    <div className={cn('transparent-input', className)}>
      <input type={type} id={label} value={value} name={name} placeholder={placeholder} autoFocus={autoFocus} autoComplete="off" onChange={onChange} disabled={disabled} />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
