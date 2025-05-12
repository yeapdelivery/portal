"use client";

import * as React from "react";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "../button";

interface DatePickerWithRangeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  className?: string;
  defaultDateValue?: DateRange | undefined;
  onChange?: (date: DateRange | undefined) => void;
  onSelectDate?: (date: DateRange | undefined) => void;
}

const now = new Date();

const startDate = startOfMonth(now);
const endDate = endOfMonth(now);

export const defaultDateValue = {
  from: startDate,
  to: endDate,
};

export function DatePickerWithRange({
  className,
  defaultDateValue,
  onSelectDate,
}: DatePickerWithRangeProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>(
    defaultDateValue
  );

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id="date"
            className={cn(
              "flex justify-end items-center gap-2 text-left font-normal mr-12 md:mr-0",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="h-4 w-4 text-gray-400" />
            <div>
              <span className="text-sm font-medium text-gray-400">
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y", {
                        locale: ptBR,
                      })}{" "}
                      até {format(date.to, "LLL dd, y", { locale: ptBR })}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y", { locale: ptBR })
                  )
                ) : (
                  <span>Escolha uma data</span>
                )}
              </span>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(selectedDate) => {
              setDate && setDate(selectedDate);
            }}
            numberOfMonths={2}
            locale={ptBR}
          />
          <div className="flex justify-end mb-4 mt-4">
            <Button
              className="w-40"
              onClick={() => {
                onSelectDate(date);
                setOpen(false);
              }}
            >
              Selecionar
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
