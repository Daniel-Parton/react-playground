import React from "react";
import { useFormikWithHelper } from "./use-formik-with-helper";
import { FormCheckBoxProps, FormCheckBox } from "../form-check-box";

export function FormikCheckBox<T = any>(props: FormCheckBoxProps<T>) {

  const { name, onChange, onBlur, ...rest } = props;
  const formik = useFormikWithHelper<T>();

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
      checked={formik.getValueFromName(name) === true}
      onChange={handleChange}
      onBlur={handleBlur}
      showError={formik.shouldShowError(name)}
      error={formik.getErrorFromName(name)}
    />
  );
}