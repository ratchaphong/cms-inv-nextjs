import * as Yup from "yup";

export const editProfileSchema = Yup.object({
  name: Yup.string().required("กรุณาระบุชื่อ-สกุล"),
  email: Yup.string().email("รูปแบบอีเมลไม่ถูกต้อง").required("กรุณาระบุอีเมล"),
  // firstName: Yup.string().required("กรุณาระบุชื่อจริง"),
  // lastName: Yup.string().required("กรุณาระบุนามสกุล"),
  // address: Yup.string().required("กรุณาระบุที่อยู่"),
  avatarUrl: Yup.string().nullable(), // ✅ อนุญาตให้ว่าง
});
