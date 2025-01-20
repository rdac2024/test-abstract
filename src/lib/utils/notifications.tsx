"use client"

import SuccessIcon from "@/assets/images/notification/success.svg";
import ErrorIcon from "@/assets/images/notification/error.svg";
import WarningIcon from "@/assets/images/notification/warning.svg";
import InfoIcon from "@/assets/images/notification/info.svg";
import { ReactNode } from "react";
import { ToastPosition, toast } from "react-toastify";

export type NotificationType = "success" | "info" | "warning" | "error";

const showNotification = (
  message: string | ReactNode,
  type?: NotificationType,
  position: ToastPosition = "top-center"
) => {
  switch (type) {
    case "info":
      toast.info(
        <div className="toast-item">
          <div className="icon">
            <InfoIcon />
          </div>
          <span>{message}</span>
        </div>,
        {
          position: position,
          closeButton: false,
          closeOnClick: true,
        }
      );
      break;
    case "warning":
      toast.warning(
        <div className="toast-item">
          <div className="icon">
            <WarningIcon />
          </div>
          <span>{message}</span>
        </div>,
        {
          position: position,
          closeButton: false,
          closeOnClick: true,
        }
      );
      break;
    case "error":
      toast.error(
        <div className="toast-item">
          <div className="icon">
            <ErrorIcon />
          </div>
          <span>{message}</span>
        </div>,
        {
          position: position,
          closeButton: false,
          closeOnClick: true,
        }
      );
      break;
    case "success":
      toast.success(
        <div className="toast-item">
          <div className="icon">
            <SuccessIcon />
          </div>
          <span>{message}</span>
        </div>,
        {
          position: position,
          closeButton: false,
          closeOnClick: true,
        }
      );
      break;
    default:
      toast.success(
        <div className="toast-item">
          <div className="icon">
            <SuccessIcon />
          </div>
          <span>{message}</span>
        </div>,
        {
          position: position,
          closeButton: false,
          closeOnClick: true,
        }
      );
      break;
  }
};

export default showNotification