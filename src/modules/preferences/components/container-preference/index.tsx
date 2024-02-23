import { ReactNode } from "react";
import { tv } from "tailwind-variants";

const containerPreferenceStyles = tv({
  slots: {
    containerStyles: [
      "bg-white rounded-lg border border-gray-700",
      "p-3 md:p-6 md:mr-6 w-full",
    ],
  },
});

interface ContainerPreferenceProps {
  children: ReactNode;
  title: string;
  description: string;
}

export function ContainerPreference({
  children,
  description,
  title,
}: ContainerPreferenceProps) {
  const { containerStyles } = containerPreferenceStyles();

  return (
    <div className="flex flex-col p-2 md:p-0 md:items-start md:flex-row">
      <div className="flex flex-col ml-6 md:ml-10 mr-8">
        <span className="text-sm text-gray-100 font-bold font-outfit tracking-tighter">
          {title}
        </span>
        <p className="text-gray-100 text-xs font-medium leading-6 min-w-[170px] max-w-[170px]">
          {description}
        </p>
      </div>
      <div className={containerStyles()}>{children}</div>
    </div>
  );
}
