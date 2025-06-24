import { PRODUCT_STATUS } from "@/store/slices/products/products.types";

// export interface CreateProduct extends Omit<Product, "id"> {}
// export type CreateProduct = Omit<Product, "id">;
export interface CreateProduct {
  name: string;
  category: string;
  initialStock: number;
  status: PRODUCT_STATUS;
}
