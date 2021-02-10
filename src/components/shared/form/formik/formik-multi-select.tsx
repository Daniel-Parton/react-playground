import React from "react";
import { useFormikWithHelper } from "./use-formik-with-helper";
import { FormMultiSelectProps, FormMultiSelect } from "../form-multi-select";
import { isArray } from "../../../../helpers/object-helper";

export function FormikMultiSelect<TFormValues = any>(props: FormMultiSelectProps<TFormValues>) {

  const { name, onChange, onBlur, ...rest } = props;
  const formik = useFormikWithHelper<TFormValues>();

  const handleChange = (value: any[], meta: any) => {
    formik.setFieldTouched(props.name as string);
    formik.setFieldValue(props.name as string, !value ? undefined : value.map(e => e.value));

    if (onChange) onChange(value, meta);
  }

  const handleBlur = (e: any) => {
    formik.setFieldTouched(props.name as string);
    if (onBlur) onBlur(e);
  }

  const safeGetDefaultValue = () => {
    if (!formik.values) return [];
    const value = (formik.values)[name] as any;
    if (!isArray(value)) return [];
    const defaultValue: any[] = [];
    (value as any[]).forEach(e => {
      const found = props.options.find(a => a.value === e);
      if (found) defaultValue.push(found);
    });
    return defaultValue;
  }

  return (
    <FormMultiSelect
      name={name}
      onChange={handleChange}
      onBlur={(e) => handleBlur(e)}
      showError={formik.shouldShowError(name)}
      error={formik.getErrorFromName(name)}
      value={safeGetDefaultValue()}
      {...rest}
    />
  )
};