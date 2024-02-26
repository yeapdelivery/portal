import Filed from "../filed";
import Select from "../select/select";

interface SelectFieldProps {
  children: React.ReactNode;
  label: string;
  htmlFor: string;
  error: string | null;
  required: boolean;
}

export default function SelectField({
  label,
  error,
  htmlFor,
  required,
  children,
}: SelectFieldProps) {
  return (
    <Filed label={label} error={error} htmlFor={htmlFor} required={required}>
      {children}
    </Filed>
  );
}

SelectField.Select = Select;
