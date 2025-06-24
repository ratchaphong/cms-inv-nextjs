export enum PRODUCT_STATUS {
  AVAILABLE = "AVAILABLE",
  LOW_STOCK = "LOW_STOCK",
  OUT_OF_STOCK = "OUT_OF_STOCK",
}

export interface Product {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  status: PRODUCT_STATUS;
}

export interface ProductsState {
  list: Product[];
  loading: boolean;
}
