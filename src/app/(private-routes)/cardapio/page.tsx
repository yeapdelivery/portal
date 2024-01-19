import { Button, Input } from "@/modules/app/components";
import { CardCatalog, SideBarCategory } from "@/modules/catalog/components";
import {
  MagnifyingGlass,
  Plus,
  PencilSimple,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Hamburgueres",
  },
  {
    id: 2,
    name: "Porções",
  },
  {
    id: 3,
    name: "Bebidas",
  },
  {
    id: 4,
    name: "Sobremesas",
  },
];

export default async function Catalog() {
  return (
    <div>
      <SideBarCategory categories={categories} />
      <div className="pl-64  px-8 mt-8">
        <div className="w-full flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-100 font-rubik">
            Cardápio
          </h2>

          <Input
            className="w-full"
            placeholder="Pesquisar"
            startIcon={<MagnifyingGlass size={20} />}
          />

          <Button className="w-80" startIcon={Plus}>
            Adicionar categoria
          </Button>
        </div>

        <div className="mt-9">
          <div className="flex items-center gap-2">
            <span className="text-gray-100 text-lg font-bold font-outfit">
              Hamburgueres
            </span>

            <div className="flex items-center justify-center w-5 h-5 rounded-full text-white font-semibold bg-red-default text-[10px]">
              10
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <CardCatalog key={index} />
            ))}
          </div>
        </div>

        <hr className="mt-6 border border-gray-700 " />

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-100 text-lg font-bold font-outfit">
              Hamburgueres
            </span>

            <div className="flex items-center justify-center w-5 h-5 rounded-full text-white font-semibold bg-red-default text-[10px]">
              10
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <CardCatalog key={index} />
            ))}
          </div>
        </div>

        <hr className="mt-6 border border-gray-700 " />

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-100 text-lg font-bold font-outfit">
              Hamburgueres
            </span>

            <div className="flex items-center justify-center w-5 h-5 rounded-full text-white font-semibold bg-red-default text-[10px]">
              10
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <CardCatalog key={index} />
            ))}
          </div>
        </div>

        <hr className="mt-6 border border-gray-700 " />

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-100 text-lg font-bold font-outfit">
              Hamburgueres
            </span>

            <div className="flex items-center justify-center w-5 h-5 rounded-full text-white font-semibold bg-red-default text-[10px]">
              10
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <CardCatalog key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
