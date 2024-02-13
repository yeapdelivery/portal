import { useState } from "react";

interface Toast {
  message: string;
  open: boolean;
}

interface ToastHook {
  toast: Toast;
  setToast: (toast: Toast) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

export function useToast(): ToastHook {
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
      });
    },
    error: (message: string) => {
      setToast({
        message,
        open: true,
      });
    },
    warning: (message: string) => {
      setToast({
        message,
        open: true,
      });
    },
    info: (message: string) => {
      setToast({
        message,
        open: true,
      });
    },
  };
}
