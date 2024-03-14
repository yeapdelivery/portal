import { Checkbox } from "@/modules/app/components/check-box";
import { Select } from "@/modules/app/components/select";
import SelectField from "@/modules/app/components/select-filed/select-filed";
import { SelectOptions } from "@/modules/app/components/select/types";
import { useState } from "react";

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

export default function CommercialHour() {
  const options = hoursAndOptions();
  const [checkedMonday, setCheckedMonday] = useState(false);

  return (
    <div>
      <hr className="border border-gray-700 my-7" />

      <h2 className="text-lg text-gray-100 font-bold">
        Horários de atendimento
      </h2>

      <div className="mt-5">
        <Checkbox
          value="monday"
          checked={checkedMonday}
          onChange={(newValue) => setCheckedMonday(newValue)}
          label="Segunda-feira"
          className="mb-2"
        />
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1">
            <SelectField
              label="Horário inicial"
              error={null}
              htmlFor="initial-monday"
            >
              <Select options={options} />
            </SelectField>
          </div>

          <div className="flex-1">
            <SelectField
              label="Horário final"
              error={null}
              htmlFor="finally-monday"
            >
              <Select options={options} />
            </SelectField>
          </div>
        </div>
      </div>

      <hr className="border border-gray-700 my-7" />

      <div className="mt-5">
        <Checkbox
          value="monday"
          checked={checkedMonday}
          onChange={(newValue) => setCheckedMonday(newValue)}
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
              <Select options={options} />
            </SelectField>
          </div>

          <div className="flex-1">
            <SelectField
              label="Horário final"
              error={null}
              htmlFor="finally-monday"
            >
              <Select options={options} />
            </SelectField>
          </div>
        </div>
      </div>

      <hr className="border border-gray-700 my-7" />

      <div className="mt-5">
        <Checkbox
          value="monday"
          checked={checkedMonday}
          onChange={(newValue) => setCheckedMonday(newValue)}
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
              <Select options={options} />
            </SelectField>
          </div>

          <div className="flex-1">
            <SelectField
              label="Horário final"
              error={null}
              htmlFor="finally-monday"
            >
              <Select options={options} />
            </SelectField>
          </div>
        </div>
      </div>
      <hr className="border border-gray-700 my-7" />

      <div className="mt-5">
        <Checkbox
          value="monday"
          checked={checkedMonday}
          onChange={(newValue) => setCheckedMonday(newValue)}
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
              <Select options={options} />
            </SelectField>
          </div>

          <div className="flex-1">
            <SelectField
              label="Horário final"
              error={null}
              htmlFor="finally-monday"
            >
              <Select options={options} />
            </SelectField>
          </div>
        </div>
      </div>
      <hr className="border border-gray-700 my-7" />

      <div className="mt-5">
        <Checkbox
          value="monday"
          checked={checkedMonday}
          onChange={(newValue) => setCheckedMonday(newValue)}
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
              <Select options={options} />
            </SelectField>
          </div>

          <div className="flex-1">
            <SelectField
              label="Horário final"
              error={null}
              htmlFor="finally-monday"
            >
              <Select options={options} />
            </SelectField>
          </div>
        </div>
      </div>
      <hr className="border border-gray-700 my-7" />

      <div className="mt-5">
        <Checkbox
          value="monday"
          checked={checkedMonday}
          onChange={(newValue) => setCheckedMonday(newValue)}
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
              <Select options={options} />
            </SelectField>
          </div>

          <div className="flex-1">
            <SelectField
              label="Horário final"
              error={null}
              htmlFor="finally-monday"
            >
              <Select options={options} />
            </SelectField>
          </div>
        </div>
      </div>
    </div>
  );
}
