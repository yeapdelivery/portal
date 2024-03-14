import { useState } from "react";
import { ToastType } from "../components/toast/types";

interface Toast {
  message: string;
  open: boolean;
  type?: ToastType;
}

interface ToastHook {
  toast: Toast;
  setToast: (toast: Toast) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

export default function useToast(): ToastHook {
  const [toast, setToast] = useState<Toast>({
    message: "",
    open: false,
  });

  return {
    toast,
    setToast,
    success: (message: string) => {
      setToast({
        message,
        open: true,
        type: ToastType.SUCCESS,
      });
    },
    error: (message: string) => {
      setToast({
        message,
        open: true,
        type: ToastType.ERROR,
      });
    },
    warning: (message: string) => {
      setToast({
        message,
        open: true,
        type: ToastType.WARNING,
      });
    },
    info: (message: string) => {
      setToast({
        message,
        open: true,
        type: ToastType.INFO,
      });
    },
  };
}
