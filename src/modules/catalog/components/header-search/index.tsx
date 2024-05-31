import Button from "@/modules/app/components/button/button";
import useDebounce from "@/modules/app/hooks/use-debounce";
import { Plus } from "@phosphor-icons/react/dist/ssr";

export function HeaderSearch() {
  const debouncedChange = useDebounce(handleChange, 500);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    debouncedChange(event);
  }

  return (
    <div className="w-full justify-between flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:mt-20">
      <h2 className="text-xl font-bold text-gray-100 font-rubik">Cardápio</h2>

      <div className="flex w-full lg:w-auto lg:block items-center justify-between mt-5 lg:mt-0">
        <span className="lg:hidden text-lg font-bold text-gray-100 font-rubik">
          Categorias
        </span>

        <Button className="w-34 lg:w-80" startIcon={Plus}>
          Adicionar categoria
        </Button>
      </div>
    </div>
  );
}
