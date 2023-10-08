import { toast, ToastOptions, Bounce } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { NotificationProps } from "../types/notification";

export const notification = ({
  position = "top-right",
  message,
  type = "info",
  theme = "light",
  autoClose = 5000,
  transitionType = Bounce,
  rtl = false,
}: NotificationProps) => {
  const toastOptions: ToastOptions = {
    position,
    autoClose,
    theme,
    transition: transitionType,
    rtl,
  };

  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "warning":
      toast.warning(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "info":
    default:
      toast.info(message, toastOptions);
  }
};
