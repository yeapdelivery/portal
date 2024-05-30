import { useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { Checkbox } from "@/modules/app/components/check-box";
import { Select } from "@/modules/app/components/select";
import SelectField from "@/modules/app/components/select-filed/select-filed";
import { SelectOptions } from "@/modules/app/components/select/types";
import { useStore } from "@/modules/app/store/stores";

import { EditStore } from "../../templates";

const hoursAndOptions = (): SelectOptions[] => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toLocaleString().padStart(2, "0");
    hours.push(`${hour}:00`);
    hours.push(`${hour}:30`);
  }

  hours.push("23:59");
  return hours.map((hour) => ({ value: hour, id: hour, title: hour }));
};

const options = hoursAndOptions();

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
  } as CheckboxFields);

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
    if (checkFields[field]) {
      setValue(`openingHours.${field}`, null);
    }

    setCheckFields({
      ...checkFields,
      [field]: !checkFields[field],
    });
  }

  return (
    <div>
      <hr className="border border-gray-700 my-7" />

      <h2 className="text-lg text-gray-100 font-bold">
        Horários de atendimento
      </h2>

      <div className="mt-5">
        <Checkbox
          value="monday"
          checked={checkFields.monday}
          onChange={() => handleCheckField("monday")}
          label="Segunda-feira"
          className="mb-2"
        />
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1">
            <SelectField
              label="Horário inicial"
              error={errors?.openingHours?.monday?.openHour?.message}
              htmlFor="initial-monday"
            >
              <Select
                options={options}
                {...register("openingHours.monday.openHour")}
                defaultValue={store?.openingHours?.monday?.openHour}
                onSelected={(value) => {
                  setValue("openingHours.monday.openHour", value.value);
                }}
                disabled={!checkFields.monday}
              />
            </SelectField>
          </div>

          <div className="flex-1">
            <SelectField
              label="Horário final"
              error={null}
              htmlFor="finally-monday"
            >
              <Select
                options={options}
                {...register("openingHours.monday.closeHour")}
                defaultValue={store?.openingHours?.monday?.closeHour}
                onSelected={(value) => {
                  setValue("openingHours.monday.closeHour", value.value);
                }}
                disabled={!checkFields.monday}
              />
            </SelectField>
          </div>
        </div>
      </div>

      <hr className="border border-gray-700 my-7" />

      <div className="mt-5">
        <Checkbox
          value="tuesday"
          checked={checkFields.tuesday}
          onChange={() => handleCheckField("tuesday")}
          label="Terça-feira"
          className="mb-2"
        />
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1">
            <SelectField
              label="Horário inicial"
              error={null}
              htmlFor="initial-monday"
            >
              <Select
                options={options}
                {...register("openingHours.tuesday.openHour")}
                defaultValue={store?.openingHours?.tuesday?.openHour}
                onSelected={(value) => {
                  setValue("openingHours.tuesday.openHour", value.value);
                }}
                disabled={!checkFields.tuesday}
              />
            </SelectField>
          </div>

          <div className="flex-1">
            <SelectField
              label="Horário final"
              error={null}
              htmlFor="finally-monday"
            >
              <Select
                options={options}
                {...register("openingHours.tuesday.closeHour")}
                defaultValue={store?.openingHours?.tuesday?.closeHour}
                onSelected={(value) => {
                  setValue("openingHours.tuesday.closeHour", value.value);
                }}
                disabled={!checkFields.tuesday}
              />
            </SelectField>
          </div>
        </div>
      </div>

      <hr className="border border-gray-700 my-7" />

      <div className="mt-5">
        <Checkbox
          value="wednesday"
          checked={checkFields.wednesday}
          onChange={() => handleCheckField("wednesday")}
          label="Quarta-feira"
          className="mb-2"
        />
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1">
            <SelectField
              label="Horário inicial"
              error={null}
              htmlFor="initial-monday"
            >
              <Select
                options={options}
                {...register("openingHours.wednesday.openHour")}
                defaultValue={store?.openingHours?.wednesday?.openHour}
                onSelected={(value) => {
                  setValue("openingHours.wednesday.openHour", value.value);
                }}
                disabled={!checkFields.wednesday}
              />
            </SelectField>
          </div>

          <div className="flex-1">
            <SelectField
              label="Horário final"
              error={null}
              htmlFor="finally-monday"
            >
              <Select
                options={options}
                {...register("openingHours.wednesday.closeHour")}
                defaultValue={store?.openingHours?.wednesday?.closeHour}
                onSelected={(value) => {
                  setValue("openingHours.wednesday.closeHour", value.value);
                }}
                disabled={!checkFields.wednesday}
              />
            </SelectField>
          </div>
        </div>
      </div>
      <hr className="border border-gray-700 my-7" />

      <div className="mt-5">
        <Checkbox
          value=""
          checked={checkFields.thursday}
          onChange={() => handleCheckField("thursday")}
          label="Quinta-feira"
          className="mb-2"
        />
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1">
            <SelectField
              label="Horário inicial"
              error={null}
              htmlFor="initial-monday"
            >
              <Select
                options={options}
                {...register("openingHours.thursday.openHour")}
                defaultValue={store?.openingHours?.thursday?.openHour}
                onSelected={(value) => {
                  setValue("openingHours.thursday.openHour", value.value);
                }}
                disabled={!checkFields.thursday}
              />
            </SelectField>
          </div>

          <div className="flex-1">
            <SelectField
              label="Horário final"
              error={null}
              htmlFor="finally-monday"
            >
              <Select
                options={options}
                {...register("openingHours.thursday.closeHour")}
                defaultValue={store?.openingHours?.thursday?.closeHour}
                onSelected={(value) => {
                  setValue("openingHours.thursday.closeHour", value.value);
                }}
                disabled={!checkFields.thursday}
              />
            </SelectField>
          </div>
        </div>
      </div>
      <hr className="border border-gray-700 my-7" />

      <div className="mt-5">
        <Checkbox
          value="friday"
          checked={checkFields.friday}
          onChange={() => handleCheckField("friday")}
          label="Sexta-feira"
          className="mb-2"
        />
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1">
            <SelectField
              label="Horário inicial"
              error={null}
              htmlFor="initial-monday"
            >
              <Select
                options={options}
                {...register("openingHours.friday.openHour")}
                defaultValue={store?.openingHours?.friday?.openHour}
                onSelected={(value) => {
                  setValue("openingHours.friday.openHour", value.value);
                }}
                disabled={!checkFields.friday}
              />
            </SelectField>
          </div>

          <div className="flex-1">
            <SelectField
              label="Horário final"
              error={null}
              htmlFor="finally-monday"
            >
              <Select
                options={options}
                {...register("openingHours.friday.closeHour")}
                defaultValue={store?.openingHours?.friday?.closeHour}
                onSelected={(value) => {
                  setValue("openingHours.friday.closeHour", value.value);
                }}
                disabled={!checkFields.friday}
              />
            </SelectField>
          </div>
        </div>
      </div>
      <hr className="border border-gray-700 my-7" />

      <div className="mt-5">
        <Checkbox
          value="saturday"
          checked={checkFields.saturday}
          onChange={() => handleCheckField("saturday")}
          label="Sábado"
          className="mb-2"
        />
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1">
            <SelectField
              label="Horário inicial"
              error={null}
              htmlFor="initial-monday"
            >
              <Select
                options={options}
                {...register("openingHours.saturday.openHour")}
                defaultValue={store?.openingHours?.saturday?.openHour}
                onSelected={(value) => {
                  setValue("openingHours.saturday.openHour", value.value);
                }}
                disabled={!checkFields.saturday}
              />
            </SelectField>
          </div>

          <div className="flex-1">
            <SelectField
              label="Horário final"
              error={null}
              htmlFor="finally-monday"
            >
              <Select
                options={options}
                {...register("openingHours.saturday.closeHour")}
                defaultValue={store?.openingHours?.saturday?.closeHour}
                onSelected={(value) => {
                  setValue("openingHours.saturday.closeHour", value.value);
                }}
                disabled={!checkFields.saturday}
              />
            </SelectField>
          </div>
        </div>
      </div>
      <hr className="border border-gray-700 my-7" />

      <div className="mt-5">
        <Checkbox
          value="sunday"
          checked={checkFields.sunday}
          onChange={() => handleCheckField("sunday")}
          label="Domingo"
          className="mb-2"
        />
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1">
            <SelectField
              label="Horário inicial"
              error={null}
              htmlFor="initial-monday"
            >
              <Select
                options={options}
                {...register("openingHours.sunday.openHour")}
                defaultValue={store?.openingHours?.sunday?.openHour}
                onSelected={(value) => {
                  setValue("openingHours.sunday.openHour", value.value);
                }}
                disabled={!checkFields.sunday}
              />
            </SelectField>
          </div>

          <div className="flex-1">
            <SelectField
              label="Horário final"
              error={null}
              htmlFor="finally-monday"
            >
              <Select
                options={options}
                {...register("openingHours.sunday.closeHour")}
                defaultValue={store?.openingHours?.sunday?.closeHour}
                onSelected={(value) => {
                  setValue("openingHours.sunday.closeHour", value.value);
                }}
                disabled={!checkFields.sunday}
              />
            </SelectField>
          </div>
        </div>
      </div>
    </div>
  );
}
