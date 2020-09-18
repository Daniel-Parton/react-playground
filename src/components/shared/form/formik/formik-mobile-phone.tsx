import React from 'react';
import { FormikProps } from 'formik';
import FormMobilePhone, { FormMobilePhoneProps } from '../form-mobile-phone';
import { safeGetValue, shouldShowError, safeGetError } from './formik-helper';

export interface FormikMobilePhoneProps<TFormValues = any> extends FormMobilePhoneProps<TFormValues> {
  formikProps: FormikProps<TFormValues>
}

function FormikMobilePhone<TFormValues = any>(props: FormikMobilePhoneProps<TFormValues>) {
  const { formikProps, name, onChange, onBlur, ...rest } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (formikProps && formikProps.handleChange) formikProps.handleChange(event);
    if (onChange) onChange(event);
  };

  const handleBlur = (event: any) => {
    if (formikProps && formikProps.handleBlur) formikProps.handleBlur(event);
    if (onBlur) onBlur(event);
  };

  return (
    <FormMobilePhone<TFormValues>
      {...rest}
      name={name}
      value={safeGetValue(formikProps, name, '')}
      onChange={handleChange}
      onBlur={handleBlur}
      showError={shouldShowError(formikProps, name)}
      error={safeGetError(formikProps, name)}
    />
  );
};

export default FormikMobilePhone;
