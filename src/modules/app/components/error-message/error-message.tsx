import { tv } from "tailwind-variants";

interface ErrorMessageProps {
  message: string;
}

const errorMessage = tv({
  slots: {
    errorStyle: "text-red-default text-xs ml-2",
  },
});

export function ErrorMessage({ message }: ErrorMessageProps) {
  const { errorStyle } = errorMessage();

  return (
    <span className={errorStyle()}>
      <strong>Erro:</strong> {message}
    </span>
  );
}
