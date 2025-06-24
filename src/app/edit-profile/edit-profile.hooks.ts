// ✅ edit-profile.hooks.ts
import { editProfileSchema } from "./edit-profile.schema";
import { EditProfileFormValues } from "./edit-profile.types";
import { getInitialEditProfileValues } from "./edit-profile.utils";
import { useAppDispatch } from "@/store/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  fetchUserProfile,
  updateUserProfile,
} from "@/store/slices/user/user.thunks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useEditProfileForm() {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { profile, loading } = useSelector((state: RootState) => state.user);

  const formikConfig = {
    enableReinitialize: true,
    initialValues: getInitialEditProfileValues(profile),
    validationSchema: editProfileSchema,
    onSubmit: (values: EditProfileFormValues) => {
      console.log("✅ Edited Profile Submitted", values);
      if (!profile) return;
      dispatch(
        updateUserProfile({
          values,
          userId: profile.id,
          onSuccess: () => {
            dispatch(fetchUserProfile());
            push("/profile");
          },
        })
      );
    },
  };

  useEffect(() => {
    if (!profile) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, profile]);

  return { formikConfig, loading, profile };
}
