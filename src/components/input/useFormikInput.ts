import { useField } from "formik";

export function useFormikInput(name: string) {
  const [field, meta] = useField(name);
  return { field, meta };
}
