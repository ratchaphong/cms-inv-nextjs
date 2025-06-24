"use client";

import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store";
import { loginSchema } from "./login.schema";
import { registerSchema } from "./register.schema";
import { loginInitialValues, registerInitialValues } from "./login.utils";
import { loginThunk, registerThunk } from "@/store/slices/auth/auth.thunks";
import { RegisterFormValues, LoginFormValues } from "./login.types";
import {
  LoginThunkPayload,
  RegisterThunkPayload,
} from "@/store/slices/auth/auth.types";
import { useRouter } from "next/navigation";

export function useLoginForm() {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { error } = useSelector((state: RootState) => state.auth);

  const [isRegisterMode, setIsRegisterMode] = useState(false);

  useEffect(() => {
    if (error) {
      console.error("❌ Login/Register error:", error);
    }
  }, [error]);

  const formikConfig = useMemo(() => {
    return {
      enableReinitialize: true,
      initialValues: isRegisterMode
        ? registerInitialValues
        : loginInitialValues,
      validationSchema: isRegisterMode ? registerSchema : loginSchema,
      onSubmit: (values: RegisterFormValues | LoginFormValues) => {
        if (isRegisterMode) {
          console.log("✅ Register with:", values);
          const request: RegisterThunkPayload = {
            values: values as RegisterFormValues,
            onSuccess: () => {
              setIsRegisterMode(false);
            },
          };
          dispatch(registerThunk(request));
        } else {
          console.log("✅ Login with:", values);
          const request: LoginThunkPayload = {
            values: values as LoginFormValues,
            onSuccess: () => {
              push("/dashboard");
            },
          };
          dispatch(loginThunk(request));
        }
      },
    };
  }, [isRegisterMode]);

  return {
    formikConfig,
    isRegisterMode,
    setIsRegisterMode,
  };
}
