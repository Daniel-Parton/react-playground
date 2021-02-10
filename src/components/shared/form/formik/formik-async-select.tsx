import React from "react";
import { useFormikWithHelper } from "./use-formik-with-helper";
import { isArray } from "../../../../helpers/object-helper";
import { FormAsyncSelectProps, FormAsyncSelect } from "../form-async-select";

export function FormikAsyncSelect<T = any>(props: FormAsyncSelectProps<T>) {

  const { name, onChange, onBlur, isMulti, ...rest } = props;
  const formik = useFormikWithHelper<T>();

  const handleChange = (value: any[], meta: any) => {
    formik.setFieldTouched(name as any);

    if (isMulti) {
      formik.setFieldValue(name as any, !value ? undefined : value.map(e => e.value));
    } else {
      formik.setFieldValue(props.name as any, !value ? undefined : (value as any).value);
    }

    if (onChange) onChange(value, meta);
  }

  const handleBlur = (e: any) => {
    formik.setFieldTouched(props.name as any);
    if (onBlur) onBlur(e);
  }

  const safeGetMultiValue = () => {
    if (!formik.values) return [];
    const value = formik.values[name];
    if (!isArray(value)) return [];
    const defaultValue: any[] = [];
    return defaultValue;
  }

  return (
    <FormAsyncSelect
      isMulti={isMulti}
      name={name}
      onChange={handleChange}
      onBlur={(e: any) => handleBlur(e)}
      showError={formik.shouldShowError(name)}
      error={formik.getErrorFromName(name)}
      defaultValue={isMulti ? safeGetMultiValue() : formik.getValueFromName(name)}
      {...rest}
    />
  )
};