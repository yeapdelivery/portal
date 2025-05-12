import { useLoading } from "@/modules/app/hooks";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";
import { useUser } from "@/modules/app/store/user";
import React from "react";
import { getTopSellingProducts } from "../services";
import Image from "next/image";
import { ImageSquare } from "@phosphor-icons/react/dist/ssr";
import { TopSellingProducts as TopSellingProductsType } from "../types";
import { Skeleton } from "@/modules/app/components/skeleton-loading";

export function TopSellingProducts() {
  const [loading, startLoading, stopLoading] = useLoading(true);
  const [topSellingProducts, setTopSellingProducts] = React.useState<
    TopSellingProductsType[]
  >([]);

  const logger = useLogger();
  const user = useUser((state) => state.user);

  async function fetchTopProduct() {
    startLoading();
    try {
      const topProduct = await getTopSellingProducts();
      setTopSellingProducts(topProduct);
    } catch (error) {
      logger.error("Erro ao carregar dados financeiros", { error });
    } finally {
      stopLoading();
    }
  }

  React.useEffect(() => {
    if (!user.id) return;
    fetchTopProduct();
  }, [user]);

  return (
    <div>
      <h1 className="font-bold text-sm xs:text-xl font-rubik text-gray-100 flex-1">
        Produtos mais vendidos
      </h1>

      <div className="bg-white rounded-lg w-full mt-4 h-[319px] border border-gray-700 md:items-center gap-10">
        <div className="bg-gray-1000 p-5 rounded-t-lg flex items-center justify-between border-b border-gray-700 w-full">
          <span className="text-gray-500">Produtos</span>
          <span className="text-gray-500">Total (30 dias)</span>
        </div>

        {topSellingProducts.length > 0 && !loading && (
          <div className="pr-4">
            {topSellingProducts.map((product) => (
              <div
                key={product.productId}
                className="flex items-start w-full pl-4 pt-4"
              >
                <div className="flex items-center justify-between w-full border-b pb-4 border-gray-700">
                  <div className="flex items-center gap-4 flex-1">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt="image"
                        width={51}
                        height={51}
                        className="w-[51px] h-[51px] min-w-[51px] min-h-[51px] text-gray-500 bg-gray-400 object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-[51px] h-[51px] text-gray-500 bg-gray-800 flex items-center justify-center rounded-xl">
                        <ImageSquare size={24} />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-100 font-bold truncate max-w-[200px] md:max-w-[280px]">
                        {product?.name}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-100 font-bold">
                      {product.totalSold}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {topSellingProducts.length === 0 && !loading && (
          <div className="flex items-center justify-center w-full h-32">
            <span className="text-gray-500">Nenhum produto encontrado</span>
          </div>
        )}

        {loading && (
          <div>
            <div className="flex items-center justify-between w-full px-4 pt-4 border-b pb-4 border-gray-700">
              <div className="flex items-center gap-4">
                <Skeleton className="w-[51px] h-[51px]" />
                <Skeleton className="w-[100px]" />
              </div>

              <Skeleton className="w-3" />
            </div>
            <div className="flex items-center justify-between w-full px-4 pt-4">
              <div className="flex items-center gap-4">
                <Skeleton className="w-[51px] h-[51px]" />
                <Skeleton className="w-[100px]" />
              </div>

              <Skeleton className="w-3" />
            </div>
            <div className="flex items-center justify-between w-full px-4 pt-4">
              <div className="flex items-center gap-4">
                <Skeleton className="w-[51px] h-[51px]" />
                <Skeleton className="w-[100px]" />
              </div>

              <Skeleton className="w-3" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
