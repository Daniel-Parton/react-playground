import { get } from 'lodash';
import { useFormikContext } from "formik";

export function useFormikWithHelper<T = any>() {

  const formik = useFormikContext<T>();

  const hasBeenTouched = (name: any) => {
    if (!formik || !formik.values || !name) return false;
    return get(formik.touched, name) ? true : false;
  };

  const getErrorFromName = (name: any) => {
    if (!formik || !formik.values || !name) return '';
    return get(formik.errors, name, '') as string;
  }

  const hasError = (name: any) => {
    return getErrorFromName(name) ? true : false;
  };

  return {
    ...formik,
    getErrorFromName,
    hasBeenTouched,
    hasError,
    shouldShowError: (name: any) => hasBeenTouched(name) && hasError(name),
    getValueFromName: (name: any, defaultValue?: any) => {
      const compiledDefaultValue = !defaultValue ? undefined : defaultValue;
      if (!formik || !formik.values || !name) return compiledDefaultValue;
      const value = get(formik.values, name);
      return value === undefined || value === null ? defaultValue : value;
    }
  };
}