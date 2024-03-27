import Image from "next/image";
import { ProductModal } from "../product-modal";
import { ProductModel } from "../../models/product-model";
import { currency } from "@/formatting";

interface CardCatalogProps {
  product: ProductModel;
}

export function CardCatalog({ product }: CardCatalogProps) {
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
              <span className="text-gray-100 font-bold">{product.name}</span>

              <ProductModal />
            </div>

            <div className="max-w-[80%] mt-1 font-outfit text-gray-100 text-[10px]">
              <p className="line-clamp-3">{product.description}</p>
            </div>
          </div>

          <span className="text-[10px] text-gray-100 font-bold">
            {currency(product.price.original)}
          </span>
        </div>
      </div>
    </div>
  );
}
