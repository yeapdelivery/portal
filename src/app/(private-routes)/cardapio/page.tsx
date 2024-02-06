import { Button, Input } from "@/modules/app/components";
import {
  CardCatalog,
  CategoryModal,
  SideBarCategory,
} from "@/modules/catalog/components";
import { AddProductButton } from "@/modules/catalog/components/AddProductButton";
import { List, MagnifyingGlass, Plus } from "@phosphor-icons/react/dist/ssr";

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

      <div className="lg:pl-64 px-5 mt-8">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:mt-20">
          <h2 className="text-xl font-bold text-gray-100 font-rubik">
            Cardápio
          </h2>

          <Input
            className="w-full mt-6 lg:mt-0"
            placeholder="Pesquisar"
            startIcon={<MagnifyingGlass size={20} />}
          />

          <div className="flex w-full lg:w-auto lg:block items-center justify-between mt-5 lg:mt-0">
            <span className="lg:hidden text-lg font-bold text-gray-100 font-rubik">
              Categorias
            </span>

            <Button className="w-34 lg:w-80" startIcon={Plus}>
              Adicionar categoria
            </Button>
          </div>
        </div>

        <CategoryModal />

        <div className="mt-9">
          <div className="flex items-center gap-2">
            <span className="text-gray-100 text-lg font-bold font-outfit">
              Hamburgueres
            </span>

            <div className="flex items-center justify-center w-5 h-5 rounded-full text-white font-semibold bg-red-default text-[10px]">
              10
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <CardCatalog key={index} />
            ))}

            <AddProductButton />
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

          <div className="grid lg:grid-cols-2 gap-5 mt-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <CardCatalog key={index} />
            ))}
            <AddProductButton />
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

          <div className="grid lg:grid-cols-2 gap-5 mt-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <CardCatalog key={index} />
            ))}
            <AddProductButton />
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

          <div className="grid lg:grid-cols-2 gap-5 mt-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <CardCatalog key={index} />
            ))}
            <AddProductButton />
          </div>
        </div>
      </div>
    </div>
  );
}
