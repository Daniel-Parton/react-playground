import React from "react";
import { FormikProps } from "formik";
import { safeGetError, safeGetTouched, safeGetValue } from "./formik-helper";
import FormAdPeoplePicker, { FormAdPeoplePickerProps } from "../form-ad-people-picker";
import { ActionMeta } from "react-select";

interface FormikAdPeoplePickerProps<T> extends FormAdPeoplePickerProps {
  formikProps: FormikProps<T>
}

const FormikAdPeoplePicker: React.FC<FormikAdPeoplePickerProps<any>> = (props) => {

  const { formikProps, name, onChange, onBlur, ...rest } = props;

  const handleChange = (values: any, action: ActionMeta<any>) => {
    const { onChange, formikProps } = props;

    if (formikProps) {
      formikProps.setFieldValue(props.name, values);
      formikProps.setFieldTouched(props.name);
    }

    if (onChange) onChange(values, action);
  }

  const handleBlur = (e: any) => {
    const { onBlur, formikProps } = props;
    if (formikProps && formikProps.handleBlur) {
      formikProps.handleBlur(e);
    }

    if (onBlur) onBlur(e);
  }

  return (
    <FormAdPeoplePicker
      name={name}
      onChange={handleChange}
      onBlur={(e: any) => handleBlur(e)}
      value={safeGetValue(formikProps, name)}
      showError={safeGetTouched(formikProps, name)}
      error={safeGetError(formikProps, name)}
      defaultValue={safeGetValue(formikProps, name)}
      {...rest}
    />
  )
};

export default FormikAdPeoplePicker;