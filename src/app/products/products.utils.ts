import { PRODUCT_STATUS } from "@/store/slices/products/products.types";
import { CreateProduct } from "./products.types";

export const addProductInitialValues: CreateProduct = {
  name: "",
  category: "",
  status: PRODUCT_STATUS.AVAILABLE,
  initialStock: 0,
};

export const PRODUCT_STATUS_OPTIONS = [
  {
    text: "Available",
    value: PRODUCT_STATUS.AVAILABLE,
  },
  {
    text: "Low stock",
    value: PRODUCT_STATUS.LOW_STOCK,
  },
  {
    text: "Out of stock",
    value: PRODUCT_STATUS.OUT_OF_STOCK,
  },
];

export const CATEGORY_OPTIONS = [
  {
    text: "Accessories",
    value: "Accessories",
  },
  {
    text: "Fashion",
    value: "Fashion",
  },
  {
    text: "Pet",
    value: "Pet",
  },
];
