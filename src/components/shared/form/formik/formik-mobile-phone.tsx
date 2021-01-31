import React from 'react';
import { useFormikContext } from 'formik';
import { FormMobilePhoneProps, FormMobilePhone } from '../form-mobile-phone';
import { safeGetValue, shouldShowError, safeGetError } from './formik-helper';

export function FormikMobilePhone<TFormValues = any>(props: FormMobilePhoneProps<TFormValues>) {
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
    <FormMobilePhone<TFormValues>
      {...rest}
      name={name}
      value={safeGetValue(formik, name, '')}
      onChange={handleChange}
      onBlur={handleBlur}
      showError={shouldShowError(formik, name)}
      error={safeGetError(formik, name)}
    />
  );
};