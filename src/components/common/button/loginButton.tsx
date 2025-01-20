"use client"

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "antd";

function LoginButton({
  className = "",
  title,
  isFullWidth,
  onClick,
  loading,
}: {
  className?: string;
  title: string;
  isFullWidth?: boolean;
  onClick?: () => void;
  loading?: boolean;
}) {
  return (
    <Button loading={loading} onClick={onClick} className={cn(className, { 'w-full': isFullWidth }, `purple-linear-button vw-h-48`)}>
      {title}
    </Button>
  );
}

export default LoginButton;
