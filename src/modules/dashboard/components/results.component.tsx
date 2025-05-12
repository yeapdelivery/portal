import React from "react";

import { currency } from "@/formatting";
import { useLoading } from "@/modules/app/hooks";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";
import { TrendDown, TrendUp } from "@phosphor-icons/react/dist/ssr";
import { getDashboardData } from "../services";
import { useUser } from "@/modules/app/store/user";
import { Dashboard } from "../types";
import { Skeleton } from "@/modules/app/components/skeleton-loading";

function Item({
  title,
  percentage,
  value,
  isCurrency = true,
  isPercentage,
  loading = false,
}: {
  title: string;
  value: number;
  percentage: number;
  isCurrency?: boolean;
  isPercentage?: boolean;
  loading?: boolean;
}) {
  const internalValue = isCurrency
    ? currency(Number((value || 0).toFixed(2)))
    : isPercentage
    ? `${(value || 0).toFixed(1)}%`
    : (value || 0).toFixed(1);
  const internalPercentage = (percentage || 0).toFixed(2);

  if (loading) {
    return (
      <div className="gap-2 flex flex-col">
        <Skeleton className="w-16" />
        <Skeleton className="w-20 h-7" />

        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    );
  }

  return (
    <div className="gap-4 text-center md:text-left">
      <span className="text-gray-500 text-lg">{title}</span>
      <p className="text-gray-100 text-2xl font-rubik font-bold">
        {internalValue}
      </p>

      <div className="flex items-center justify-center md:justify-start gap-1 text-center md:text-left">
        {percentage < 0 ? (
          <TrendDown size={12} className="text-red-primary-dark" />
        ) : (
          <TrendUp size={12} className="text-green-500" />
        )}
        <span className="text-xs text-gray-500">
          {percentage < 0
            ? internalPercentage.replace("-", "")
            : internalPercentage.replace("-", "")}
          %
        </span>
      </div>
    </div>
  );
}

export function DashboardResults() {
  const [loading, startLoading, stopLoading] = useLoading(true);
  const [dashboard, setDashboard] = React.useState<Dashboard>({} as Dashboard);
  const logger = useLogger();
  const user = useUser((state) => state.user);

  async function fetchDashboard() {
    startLoading();
    try {
      const dashboardData = await getDashboardData();
      setDashboard(dashboardData);
    } catch (error) {
      logger.error("Erro ao carregar dados financeiros", { error });
    } finally {
      stopLoading();
    }
  }

  React.useEffect(() => {
    if (!user.id) return;
    fetchDashboard();
  }, [user]);

  return (
    <div>
      <h1 className="font-bold text-sm xs:text-xl font-rubik text-gray-100 flex-1">
        Resultado deste mês
      </h1>

      <div className="bg-white rounded-lg p-5 md:p-8 w-full h-[319px] flex items-center mt-4 border border-gray-700 md:items-center">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <Item
              title="Faturamento"
              value={dashboard?.total?.value}
              percentage={dashboard?.total?.percentage}
              loading={loading}
            />
            <Item
              title="Ticket médio"
              value={dashboard?.averageTicketPrice?.value}
              percentage={dashboard?.averageTicketPrice?.percentage}
              loading={loading}
            />
            <div className="hidden md:block">
              <Item
                title="Novos clientes"
                value={dashboard?.newClients?.value}
                percentage={dashboard?.newClients?.percentage}
                isCurrency={false}
                loading={loading}
              />
            </div>
          </div>

          <div className="flex items-center justify-around mt-10">
            <div className="block md:hidden">
              <Item
                title="Novos clientes"
                value={dashboard?.newClients?.value}
                percentage={dashboard?.newClients?.percentage}
                isCurrency={false}
                loading={loading}
              />
            </div>
            <Item
              title="Visitas na loja"
              value={dashboard?.storeViews?.value}
              percentage={dashboard?.storeViews?.percentage}
              isCurrency={false}
              loading={loading}
            />
            <div className="hidden md:block">
              <Item
                title="Taxa de conversão"
                value={dashboard?.conversion?.value}
                percentage={dashboard?.conversion?.percentage}
                isCurrency={false}
                isPercentage
                loading={loading}
              />
            </div>
          </div>
          <div className="flex md:hidden items-center justify-around mt-10">
            <Item
              title="Taxa de conversão"
              value={dashboard?.conversion?.value}
              percentage={dashboard?.conversion?.percentage}
              isCurrency={false}
              isPercentage
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
