import { useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { Checkbox } from "@/modules/app/components/check-box";
import { useStore } from "@/modules/app/store/stores";
import { EditStore } from "../../templates";
import TextFiled from "@/modules/app/components/text-filed";

interface CommercialHourProps {
  errors: FieldErrors<EditStore>;
  getValues: UseFormGetValues<EditStore>;
  register: UseFormRegister<EditStore>;
  setValue: UseFormSetValue<EditStore>;
}

interface CheckboxFields {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export default function CommercialHour({
  errors,
  register,
  setValue,
  getValues,
}: CommercialHourProps) {
  const store = useStore((state) => state.store);
  const [checkFields, setCheckFields] = useState<CheckboxFields>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  useEffect(() => {
    if (!store?.openingHours) return;

    setCheckFields({
      monday: !!store?.openingHours?.monday?.openHour,
      tuesday: !!store?.openingHours?.tuesday?.openHour,
      wednesday: !!store?.openingHours?.wednesday?.openHour,
      thursday: !!store?.openingHours?.thursday?.openHour,
      friday: !!store?.openingHours?.friday?.openHour,
      saturday: !!store?.openingHours?.saturday?.openHour,
      sunday: !!store?.openingHours?.sunday?.openHour,
    });
  }, [store?.openingHours]);

  function handleCheckField(field: keyof CheckboxFields) {
    const isChecked = checkFields[field];

    if (isChecked) {
      setValue(`openingHours.${field}`, null);
    } else {
      const lastFilledDay = Object.keys(checkFields)
        .filter((day) => checkFields[day as keyof CheckboxFields])
        .reverse()
        .find((day) => {
          const open = getValues(
            `openingHours.${day as keyof CheckboxFields}.openHour`
          );
          const close = getValues(
            `openingHours.${day as keyof CheckboxFields}.closeHour`
          );
          return open && close;
        }) as keyof CheckboxFields | undefined;

      if (lastFilledDay) {
        const lastOpen = getValues(`openingHours.${lastFilledDay}.openHour`);
        const lastClose = getValues(`openingHours.${lastFilledDay}.closeHour`);

        setValue(`openingHours.${field}.openHour`, lastOpen);
        setValue(`openingHours.${field}.closeHour`, lastClose);
      } else {
        setValue(`openingHours.${field}.openHour`, "");
        setValue(`openingHours.${field}.closeHour`, "");
      }
    }

    setCheckFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  const days = [
    { key: "monday", label: "Segunda-feira" },
    { key: "tuesday", label: "Terça-feira" },
    { key: "wednesday", label: "Quarta-feira" },
    { key: "thursday", label: "Quinta-feira" },
    { key: "friday", label: "Sexta-feira" },
    { key: "saturday", label: "Sábado" },
    { key: "sunday", label: "Domingo" },
  ] as const;

  return (
    <div>
      <hr className="border border-gray-700 my-7" />
      <h2 className="text-lg text-gray-100 font-bold">
        Horários de atendimento
      </h2>

      {days.map((day) => (
        <div key={day.key} className="mt-5">
          <Checkbox
            value={day.key}
            checked={checkFields[day.key]}
            onChange={() => handleCheckField(day.key)}
            label={day.label}
            className="mb-2"
          />
          <div className="flex items-start gap-4 w-full">
            <div className="flex-1">
              <TextFiled
                htmlFor={`initial-${day.key}`}
                label="Horário inicial"
                error={errors?.openingHours?.[day.key]?.openHour?.message}
              >
                <TextFiled.Input
                  placeholder="Exemplo: 08:00"
                  maxLength={5}
                  mask="99:99"
                  {...register(`openingHours.${day.key}.openHour`)}
                  defaultValue={
                    getValues(`openingHours.${day.key}.openHour`) || ""
                  }
                  disabled={!checkFields[day.key]}
                />
              </TextFiled>
            </div>

            <div className="flex-1">
              <TextFiled
                htmlFor={`final-${day.key}`}
                label="Horário final"
                error={errors?.openingHours?.[day.key]?.closeHour?.message}
              >
                <TextFiled.Input
                  placeholder="Exemplo: 18:00"
                  maxLength={5}
                  mask="99:99"
                  {...register(`openingHours.${day.key}.closeHour`)}
                  defaultValue={
                    getValues(`openingHours.${day.key}.closeHour`) || ""
                  }
                  disabled={!checkFields[day.key]}
                />
              </TextFiled>
            </div>
          </div>
          <hr className="border border-gray-700 my-7" />
        </div>
      ))}
    </div>
  );
}
