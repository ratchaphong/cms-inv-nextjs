import * as Yup from "yup";

export const registerSchema = Yup.object({
  email: Yup.string().email("อีเมลไม่ถูกต้อง").required("กรุณาระบุอีเมล"),
  password: Yup.string()
    .min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร")
    .required("กรุณาระบุรหัสผ่าน"),
  name: Yup.string().required("กรุณาระบุชื่อ-นามสกุล"),
});
