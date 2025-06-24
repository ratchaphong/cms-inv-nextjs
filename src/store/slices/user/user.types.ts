import { EditProfileFormValues } from "@/app/edit-profile/edit-profile.types";
import { Product } from "../products/products.types";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: "male" | "female" | "other";
  birthDate: string; // ISO date format
  avatarUrl?: string; // สำหรับแสดงรูปโปรไฟล์
  address?: string;
  role: "user" | "admin";
}

export interface DashboardStats {
  totalProducts: number;
  stockInToday: number;
  stockOutToday: number;
  totalUsers: number;
  availableProducts: Product[];
}

export interface UserState {
  profile: UserProfile | null;
  dashboardStats: DashboardStats | null;
  loading: boolean;
}

export interface EditProfileThunkPayload {
  values: EditProfileFormValues;
  userId: number;
  onSuccess: () => void;
}
