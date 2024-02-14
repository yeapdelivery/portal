"use client";

import { useEffect, useState } from "react";

export function getHourAndMinutes(): string {
  const date = new Date();
  const hour = (date.getUTCHours() - 3).toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minutes}`;
}

export default function HourHeader() {
  const [hour, setHour] = useState(getHourAndMinutes());

  useEffect(() => {
    const timer = setInterval(() => {
      setHour(getHourAndMinutes());
    }, 1000 * 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span data-cy="hour-header" className="text-xs text-neutral-500">
      {hour}
    </span>
  );
}
