import { LoginFormValues, RegisterFormValues } from "@/app/login/login.types";

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
  qrBase64: string | null;
}

export interface LoginThunkPayload {
  values: LoginFormValues;
  onSuccess: () => void;
}

export interface RegisterThunkPayload {
  values: RegisterFormValues;
  onSuccess: () => void;
}

export interface FixedApkQrResponse {
  qrBase64: string;
}
