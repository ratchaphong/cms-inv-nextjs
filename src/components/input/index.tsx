"use client";

import { useFormikInput } from "./useFormikInput";
import type { FormikInputProps } from "./input.types";
import styles from "./input.module.scss";

export default function FormikInput({
  name,
  type = "text",
  placeholder,
  className = "",
  min,
  max,
}: FormikInputProps) {
  const { field, meta } = useFormikInput(name);

  return (
    <div>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        className={`${styles.input} ${className}`}
      />
      {meta.touched && meta.error && (
        <div className={styles.error}>{meta.error}</div>
      )}
    </div>
  );
}
