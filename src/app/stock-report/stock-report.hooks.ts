import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchStockArchivedReports } from "@/store/slices/stocks/stocks.thunks";
import { useEffect } from "react";

export function useStockReport() {
  const dispatch = useAppDispatch();
  const { stockReports, loading } = useAppSelector((state) => state.stocks);

  useEffect(() => {
    dispatch(fetchStockArchivedReports());
  }, [dispatch]);

  return { data: stockReports, loading };
}
