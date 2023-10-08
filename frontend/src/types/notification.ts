import { Slide, Zoom, Flip, Bounce } from "react-toastify";

export type NotificationProps = {
  message?: string;
  autoClose?: number;
  rtl?: boolean;
  theme?: "light" | "dark" | "colored";
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
  type: "info" | "success" | "warning" | "error" | "default";
  transitionType?: typeof Slide | typeof Zoom | typeof Flip | typeof Bounce;
};
