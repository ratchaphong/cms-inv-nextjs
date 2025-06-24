import { UserProfile } from "@/store/slices/user/user.types";
import { EditProfileFormValues } from "./edit-profile.types";

export const getInitialEditProfileValues = (
  profile: UserProfile | null
): EditProfileFormValues => ({
  name: profile?.name || "",
  email: profile?.email || "",
  phoneNumber: profile?.phoneNumber || "",
  address: profile?.address || "",
  avatarUrl: profile?.avatarUrl || "",
});
