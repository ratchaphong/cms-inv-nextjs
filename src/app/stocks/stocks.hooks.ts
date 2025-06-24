// ✅ src/app/stocks/stocks.hooks.ts
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import {
  addStockItem,
  fetchStockItems,
} from "@/store/slices/stocks/stocks.thunks";
import { addStockSchema } from "./stocks.schema";
import { StockFormValues } from "./stocks.types";
import { FormikHelpers } from "formik";
import { stockFormInitialValues } from "./stocks.utils";
import { fetchProducts } from "@/store/slices/products/products.thunks";

export function useStocks() {
  const dispatch = useAppDispatch();
  const { stockItems, loading } = useAppSelector(
    (state: RootState) => state.stocks
  );
  const { list } = useAppSelector((state: RootState) => state.products);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseForm = () => setShowAddForm(false);

  const formikConfig = {
    enableReinitialize: true,
    initialValues: stockFormInitialValues,
    validationSchema: addStockSchema,
    onSubmit: (
      values: StockFormValues,
      { resetForm }: FormikHelpers<StockFormValues>
    ) => {
      dispatch(
        addStockItem({
          values,
          onSuccess: () => {
            resetForm();
            handleCloseForm();
          },
        })
      );
    },
  };

  useEffect(() => {
    dispatch(fetchStockItems());
    dispatch(fetchProducts());
  }, [dispatch]);

  return {
    stockItems,
    // products: list.filter((l) =>
    //   [PRODUCT_STATUS.AVAILABLE, PRODUCT_STATUS.LOW_STOCK].includes(l.status)
    // ),
    products: list,
    loading,
    showAddForm,
    formikConfig,
    handleShowAddForm,
    handleCloseForm,
  };
}
