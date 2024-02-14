"use client";

import { useRef, useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { CalendarBlank, CaretDown } from "@phosphor-icons/react";
import ptBr from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

import Input from "../input";
import "./style.css";

registerLocale("pt-br", ptBr);

interface DatePickerProps {
  onChange?: (date: Date) => void;
  maxDate?: Date;
  minDate?: Date;
}

export default function DatePicker({
  maxDate,
  minDate,
  onChange,
}: DatePickerProps) {
  const [startDate, setStartDate] = useState(new Date());
  const [isFocus, setIsFocus] = useState(false);
  const [closedFocus, setClosedFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleOnchange(date: Date) {
    setStartDate(date);
    setIsFocus(false);
    onChange(date);
    inputRef.current?.blur();
  }

  function handleOnFocus() {
    setIsFocus(true);
    setClosedFocus(true);
  }

  function handleOnBlur() {
    setIsFocus(false);
    setClosedFocus(false);
  }

  function handleOnClickOutside() {
    setIsFocus(false);
    setClosedFocus(false);
  }

  function onClickInput() {
    if (closedFocus) {
      setIsFocus(true);
    }
  }

  return (
    <ReactDatePicker
      data-cy="date-picker"
      selected={startDate}
      onChange={handleOnchange}
      open={isFocus}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      onClickOutside={handleOnClickOutside}
      onInputClick={onClickInput}
      maxDate={maxDate}
      minDate={minDate}
      dateFormat="dd/MM/yyyy"
      customInput={
        <Input
          className="h-7 md:h-10"
          ref={inputRef}
          startIcon={
            <button data-cy="calendar-date-picker" onClick={handleOnFocus}>
              <CalendarBlank size={20} className="text-red-default" />
            </button>
          }
          mask="99/99/9999"
          endIcon={
            <button data-cy="arrow-date-picker" onClick={handleOnFocus}>
              <CaretDown
                data-state={isFocus}
                size={20}
                weight="bold"
                className="text-gray-500 data-[state=true]:rotate-180 transition-all duration-300 ease-in-out"
              />
            </button>
          }
        />
      }
    />
  );
}
