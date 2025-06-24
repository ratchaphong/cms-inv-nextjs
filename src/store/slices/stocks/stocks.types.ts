import { Product } from "../products/products.types";

export enum STOCK_ACTION {
  IN = "IN",
  OUT = "OUT",
}

export interface StockItem {
  createdAt: string;
  id: string;
  product: Product;
  note: string;
  quantity: number;
  type: STOCK_ACTION;
}

export interface StockState {
  stockItems: StockItem[];
  stockReports: StockArchivedReport[];
  loading: boolean;
}

export type StockArchivedReport = {
  stockId: number;
  type: STOCK_ACTION;
  quantity: number;
  note: string;
  productId: number;
  productName: string;
  createdAt: string;
  archivedAt: string;
};
