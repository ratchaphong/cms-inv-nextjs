import * as Yup from "yup";

export const addProductSchema = Yup.object({
  name: Yup.string().required("กรุณาระบุชื่อสินค้า"),
  category: Yup.string().required("กรุณาระบุหมวดหมู่สินค้า"),
  initialStock: Yup.number()
    .min(0, "จำนวนสต็อกต้องมากกว่าหรือเท่ากับ 0")
    .required("กรุณาระบุจำนวนสต็อกเริ่มต้น"),
});
