import React from "react";
import { useFormikContext } from "formik";
import { safeGetError, safeGetTouched } from "./formik-helper";
import { isArray } from "../../../../helpers/object-helper";
import { FormTagInputProps, FormTagInput } from "../form-tag-input";
import { OptionModel } from "../../../../types/shared-types";

export function FormikTagInput<TFormValues = any>(props: FormTagInputProps<TFormValues>) {

  const { name, onChange, onBlur, ...rest } = props;
  const formik = useFormikContext<TFormValues>();

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
    const value = (formik.values as any)[name] as any;
    if (!isArray(value)) return [];
    const defaultValue: any[] = [];
    (value as any[]).forEach(e => {
      const found = props.options && props.options.find(a => a.value === e);
      if (found) {
        defaultValue.push(found);
      } else {
        const newOption: OptionModel<any> = { label: e, value: e };
        defaultValue.push(newOption);
      }
    });
    return defaultValue;
  }

  return (
    <FormTagInput<TFormValues>
      name={name as any}
      onChange={handleChange}
      onBlur={(e: any) => handleBlur(e)}
      showError={safeGetTouched(formik, name)}
      error={safeGetError(formik, name)}
      defaultValue={safeGetDefaultValue()}
      {...rest}
    />
  )
};