import { DatePicker, TextFiled } from "@/modules/app/components";
import {
  MagnifyingGlass,
  SlidersHorizontal,
} from "@phosphor-icons/react/dist/ssr";
import { CardOrder } from "../components";

export function ListOrders() {
  return (
    <div className="px-4 py-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <h1 className="font-bold text-xl font-rubik text-gray-100">
            Pedidos
          </h1>
          <div className="text-xs text-red-default border border-red-default rounded px-2 py-[2px]">
            10 ocorrencias
          </div>
        </div>

        <div className="flex-1">
          <TextFiled error={null} htmlFor="search" label="">
            <TextFiled.Input
              id="search"
              placeholder="Procure por cliente, telefone ou número."
              startIcon={
                <MagnifyingGlass size={20} className="text-gray-500" />
              }
            />
          </TextFiled>
        </div>

        <DatePicker maxDate={new Date()} />
      </div>

      <div className="mt-6 grid grid-cols-kanban gap-[10px]">
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <h2 className="font-bold text-gray-100">Produção</h2>
            <div className="w-5 h-5 rounded-full bg-red-default flex items-center justify-center text-xs font-semibold text-white">
              10
            </div>
          </div>

          <div className="mt-2 space-y-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <CardOrder key={index} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <hr className="min-h-full w-[1px] border border-gray-700" />
        </div>

        <div>
          <div className="flex items-center gap-1">
            <h2 className="font-bold text-gray-100">Entrega</h2>
            <div className="w-5 h-5 rounded-full bg-red-default flex items-center justify-center text-xs font-semibold text-white">
              10
            </div>
          </div>
          <div className="mt-2 space-y-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <CardOrder key={index} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <hr className="min-h-full w-[1px] border border-gray-700" />
        </div>

        <div>
          <div className="flex items-center gap-1">
            <h2 className="font-bold text-gray-100">Finalizados</h2>
            <div className="w-5 h-5 rounded-full bg-red-default flex items-center justify-center text-xs font-semibold text-white">
              10
            </div>
          </div>
          <div className="mt-2 space-y-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <CardOrder key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
