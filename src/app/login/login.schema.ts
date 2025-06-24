import * as Yup from "yup";

export const loginSchema = Yup.object({
  username: Yup.string().required("กรุณาระบุชื่อผู้ใช้"),
  password: Yup.string().required("กรุณาระบุรหัสผ่าน"),
});
