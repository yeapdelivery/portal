"use client";
import React, { useEffect } from "react";
import { DateRange } from "react-day-picker";

import {
  DatePickerWithRange,
  defaultDateValue,
} from "@/modules/app/components/date-picker-v2";
import { List } from "@phosphor-icons/react/dist/ssr";
import { useLoading } from "@/modules/app/hooks";
import { getFinancialData } from "../services";
import { FinancialData } from "../types";
import { currency } from "@/formatting";
import { formatDate } from "@/formatting/date";
import { useUser } from "@/modules/app/store/user";
import { Skeleton } from "@/modules/app/components/skeleton-loading";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";

export function DashboardTemplate() {
  const { user } = useUser();

  const [date, setDate] = React.useState<DateRange | undefined>(
    defaultDateValue
  );
  const [financial, setFinancial] = React.useState<FinancialData>(
    {} as FinancialData
  );

  const [loading, startLoading, stopLoading] = useLoading();

  const logger = useLogger();

  useEffect(() => {
    if (!user.id) return;

    if (date.from && date.to) {
      fetchData();
    }
  }, [user, date]);

  async function fetchData() {
    startLoading();
    try {
      const financialData = await getFinancialData({
        startDate: date?.from?.toString() || "",
        endDate: date?.to?.toString() || "",
      });

      setFinancial(financialData);
    } catch (err) {
      logger.error("Erro ao carregar dados financeiros", { err });
    } finally {
      stopLoading();
    }
  }

  return (
    <div className="px-4">
      <div className="flex gap-2 items-center">
        <h1 className="font-bold text-sm xs:text-xl font-rubik text-gray-100">
          Dashboard
        </h1>
        <div>
          <DatePickerWithRange
            className="w-full xs:w-80"
            date={date}
            onChange={setDate}
          />
        </div>
      </div>
      {!loading ? (
        <div className="bg-white rounded-lg p-4 mt-4 flex justify-between border border-gray-700 h-52 items-center">
          <div className="flex flex-col items-center flex-1">
            <span className="font-medium text-lg text-gray-500">
              Total de pedidos
            </span>
            <span className="font-bold text-3xl">{financial?.totalOrders}</span>
          </div>

          <div className="flex-1 bg-green-default h-full rounded-xl flex flex-col justify-between">
            <div className="flex flex-col justify-between p-2">
              <span className="text-lg text-white font-bold">
                Total vendido
              </span>

              <span className="text-3xl font-bold text-white">
                {currency(financial?.totalPrice)}
              </span>
            </div>

            <div className="bg-green-primary-dark rounded-b-lg">
              <div className="p-2 flex items-center gap-2 text-white">
                <List size={28} />
                <span>
                  Total entre {formatDate(date?.from?.toString())} à{" "}
                  {formatDate(date?.to?.toString())}
                </span>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col flex-1 items-center">
          <span className="font-medium text-lg text-gray-500">
            Total à receber
          </span>
          <span className="font-bold text-3xl">R$ 0,00</span>
        </div> */}
        </div>
      ) : (
        <div className="px-4">
          <div className="bg-white rounded-lg p-4 mt-4 flex justify-between border border-gray-700 h-52 items-center gap-4">
            <Skeleton className="flex-1 h-full rounded-xl" />
            <Skeleton className="flex-1 h-full rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}
