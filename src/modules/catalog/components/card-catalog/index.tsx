import Image from "next/image";
import { ProductModal } from "../product-modal";
import { ProductModel } from "../../models/product-model";
import { currency } from "@/formatting";
import { ImageSquare } from "@phosphor-icons/react/dist/ssr";

interface CardCatalogProps {
  product: ProductModel;
}

export function CardCatalog({ product }: CardCatalogProps) {
  return (
    <div className="p-3 bg-white rounded-xl flex gap-4">
      {product.image ? (
        <div>
          <Image
            src={product.image}
            alt="hamburguer"
            width={117}
            height={117}
            className="w-[100px] h-[83px] text-gray-500 bg-gray-400 object-cover rounded-xl"
          />
        </div>
      ) : (
        <div className="w-[100px] h-[83px] text-gray-500 bg-gray-800 flex items-center justify-center rounded-xl">
          <ImageSquare size={32} />
        </div>
      )}

      <div className="w-full">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-gray-100 font-bold">{product?.name}</span>

              <ProductModal />
            </div>

            <div className="max-w-[80%] mt-1 font-outfit text-gray-100 text-[10px]">
              <p className="line-clamp-3">{product?.description}</p>
            </div>
          </div>

          <span className="text-[10px] text-gray-100 font-bold">
            {currency(product?.price?.original)}
          </span>
        </div>
      </div>
    </div>
  );
}
