import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { fixedApkQrThunk } from "@/store/slices/auth/auth.thunks";

export function useDownloadAPKForm() {
  const dispatch = useAppDispatch();
  const { loading, qrBase64 } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fixedApkQrThunk());
  }, [dispatch]);

  return { loading, qrBase64 };
}
