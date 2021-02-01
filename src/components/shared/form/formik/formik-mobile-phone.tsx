import React from 'react';
import { useFormikWithHelper } from "./use-formik-with-helper";
import { FormMobilePhoneProps, FormMobilePhone } from '../form-mobile-phone';

export function FormikMobilePhone<TFormValues = any>(props: FormMobilePhoneProps<TFormValues>) {
  const { name, onChange, onBlur, ...rest } = props;

  const formik = useFormikWithHelper<TFormValues>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);
    if (onChange) onChange(event);
  };

  const handleBlur = (event: any) => {
    formik.handleBlur(event);
    if (onBlur) onBlur(event);
  };

  return (
    <FormMobilePhone<TFormValues>
      {...rest}
      name={name}
      value={formik.getValueFromName(name)}
      onChange={handleChange}
      onBlur={handleBlur}
      showError={formik.shouldShowError(name)}
      error={formik.getErrorFromName(name)}
    />
  );
};