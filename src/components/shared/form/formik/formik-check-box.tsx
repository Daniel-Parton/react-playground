import React from "react";
import { useFormikContext } from "formik";
import { FormCheckBoxProps, FormCheckBox } from "../form-check-box";
import { safeGetValue, shouldShowError, safeGetError } from "./formik-helper";

export function FormikCheckBox<T = any>(props: FormCheckBoxProps<T>) {

  const { name, onChange, onBlur, ...rest } = props;
  const formik = useFormikContext<T>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(name as any, event.currentTarget.checked);
    if (onChange) onChange(event);
  };

  const handleBlur = (event: any) => {
    formik.handleBlur(event);
    if (onBlur) onBlur(event);
  };

  return (
    <FormCheckBox
      {...rest}
      name={name}
      checked={safeGetValue(formik, name) === true}
      onChange={handleChange}
      onBlur={handleBlur}
      showError={shouldShowError(formik, name)}
      error={safeGetError(formik, name)}
    />
  );
}