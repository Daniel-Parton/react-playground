import React from "react";
import { useFormikContext } from "formik";
import { FormSelectProps, FormSelect } from "../form-select";
import { safeGetValue, shouldShowError, safeGetError } from "./formik-helper";

export function FormikSelect<TFormValues = any>(props: FormSelectProps<TFormValues>) {

  const { name, onChange, onBlur, ...rest } = props;
  const formik = useFormikContext<TFormValues>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);
    if (onChange) onChange(event);
  };

  const handleBlur = (event: any) => {
    formik.handleBlur(event);
    if (onBlur) onBlur(event);
  };

  return (
    <FormSelect<TFormValues>
      {...rest}
      name={name}
      value={safeGetValue(formik, name)}
      onChange={handleChange}
      onBlur={handleBlur}
      showError={shouldShowError(formik, name)}
      error={safeGetError(formik, name)}
    />
  );
}