"use client";

import DatePicker from "@/modules/app/components/date-picker";
import { DatePickerWithRange } from "@/modules/app/components/date-picker-v2";
import { List } from "@phosphor-icons/react/dist/ssr";

export function DashboardTemplate() {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-sm xs:text-xl font-rubik text-gray-100">
          Dashboard
        </h1>
        <div>
          <DatePickerWithRange onChange={(date) => console.log(date)} />
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 mt-4 flex justify-between border border-gray-700 h-52 items-center">
        <div className="flex flex-col items-center flex-1">
          <span className="font-medium text-lg text-gray-500">
            Total de pedidos
          </span>
          <span className="font-bold text-3xl">33</span>
        </div>

        <div className="flex-1 bg-green-default h-full rounded-xl flex flex-col justify-between">
          <div className="flex flex-col justify-between p-2">
            <span className="text-lg text-white font-bold">Total vendido</span>

            <span className="text-3xl font-bold text-white">R$ 0,00</span>
          </div>

          <div className="bg-green-primary-dark rounded-b-lg">
            <div className="p-2 flex items-center gap-2 text-white">
              <List size={28} />
              <span>Total vendido hoje</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center">
          <span className="font-medium text-lg text-gray-500">
            Total à receber
          </span>
          <span className="font-bold text-3xl">R$ 0,00</span>
        </div>
      </div>
    </div>
  );
}
