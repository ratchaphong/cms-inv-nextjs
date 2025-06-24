import { AppDispatch, RootState } from "@/store";
import { fetchUserProfile } from "@/store/slices/user/user.thunks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useProfileForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading } = useSelector((state: RootState) => state.user);
  const { push } = useRouter();

  const handleUpdateProfileRedirect = () => {
    push("/edit-profile");
  };

  useEffect(() => {
    if (!profile) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, profile]);

  return { profile, loading, handleUpdateProfileRedirect };
}
