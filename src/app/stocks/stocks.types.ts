import { STOCK_ACTION } from "@/store/slices/stocks/stocks.types";

export interface StockFormValues {
  productId: number;
  quantity: number;
  action: STOCK_ACTION;
  note?: string;
}
