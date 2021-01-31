import React from "react";
import { useFormikContext } from "formik";
import { safeGetError, safeGetTouched, safeGetValue } from "./formik-helper";
import FormAdPeoplePicker, { FormAdPeoplePickerProps } from "../form-ad-people-picker";
import { ActionMeta } from "react-select";

export function FormikAdPeoplePicker<T = any>(props: FormAdPeoplePickerProps<T>) {

  const { name, onChange, onBlur, ...rest } = props;

  const formik = useFormikContext();
  const handleChange = (values: any, action: ActionMeta<any>) => {

    formik.setFieldValue(name as any, values);
    formik.setFieldTouched(name as any);

    if (onChange) onChange(values, action);
  }

  const handleBlur = (e: any) => {
    formik.handleBlur(e);
    if (onBlur) onBlur(e);
  }

  return (
    <FormAdPeoplePicker
      name={name}
      onChange={handleChange}
      onBlur={(e: any) => handleBlur(e)}
      value={safeGetValue(formik, name)}
      showError={safeGetTouched(formik, name)}
      error={safeGetError(formik, name)}
      defaultValue={safeGetValue(formik, name)}
      {...rest}
    />
  )
};