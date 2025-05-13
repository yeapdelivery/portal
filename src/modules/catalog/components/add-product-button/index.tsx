import { Plus } from "@phosphor-icons/react/dist/ssr";
import { tv } from "tailwind-variants";

const addProductButton = tv({
  slots: {
    container: [
      "flex flex-col items-center justify-center ",
      "border border-dashed border-gray-500 rounded-lg",
      "text-gray-500 font-medium w-full h-28",
    ],
  },
});

export function AddProductButton() {
  const { container } = addProductButton();

  return (
    <div className={container()}>
      <Plus size={16} weight="bold" />
      <span>Adicionar produto</span>
    </div>
  );
}
