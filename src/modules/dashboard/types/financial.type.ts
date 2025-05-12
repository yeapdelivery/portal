export interface FinancialData {
  totalPrice: number;
  totalOrders: number;
  totalReferral: number;
}

export interface Dashboard {
  total: DashboardResultValues;
  averageTicketPrice: DashboardResultValues;
  newClients: DashboardResultValues;
  storeViews: DashboardResultValues;
  conversion: DashboardResultValues;
}

export interface TopSellingProducts {
  totalSold: number;
  productId: string;
  name: string;
  image?: string;
}

export interface DashboardResultValues {
  value: number;
  pastValue: number;
  percentage: number;
}
