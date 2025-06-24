import { STOCK_ACTION } from "@/store/slices/stocks/stocks.types";
import * as Yup from "yup";

export const addStockSchema = Yup.object({
  productId: Yup.string().required("Product name is required"),
  quantity: Yup.number().min(1).required("Quantity is required"),
  action: Yup.string().oneOf([STOCK_ACTION.IN, STOCK_ACTION.OUT]).required(),
  note: Yup.string().notRequired(),
});
