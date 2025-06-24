// login.utils.ts

import { LoginFormValues, RegisterFormValues } from "./login.types";

export const loginInitialValues: LoginFormValues = {
  username: "",
  password: "",
};

export const registerInitialValues: RegisterFormValues = {
  email: "",
  password: "",
  name: "",
};
