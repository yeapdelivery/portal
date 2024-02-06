import { PencilSimple } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { ProductModal } from "../product-modal";

export function CardCatalog() {
  return (
    <div className="p-3 bg-white rounded-xl flex gap-4">
      <div>
        <Image
          src="/hamburguer.svg"
          alt="hamburguer"
          width={117}
          height={117}
        />
      </div>

      <div className="w-full">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-gray-100 font-bold">Insano Burguer</span>

              <ProductModal />
            </div>

            <div className="max-w-[80%] mt-1 font-outfit text-gray-100 text-[10px]">
              <p>
                Pão de brioche, 1 hambúrguer de carne 120g, cebola caramelizada,
                queijo cheddar, bacon, molho barbecue e maionese da casa
              </p>
            </div>
          </div>

          <span className="text-[10px] text-gray-100 font-bold">R$ 20,00</span>
        </div>
      </div>
    </div>
  );
}
