import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchDashboardStats } from "@/store/slices/user/user.thunks";

export function useDashboardData() {
  const dispatch = useDispatch<AppDispatch>();
  const { dashboardStats, loading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return { dashboardStats, loading };
}
