import { STOCK_ACTION } from "@/store/slices/stocks/stocks.types";
import { StockFormValues } from "./stocks.types";

export const stockFormInitialValues: StockFormValues = {
  quantity: 0,
  action: "" as STOCK_ACTION,
  note: "",
  productId: "" as unknown as number,
};
