import React from "react";
import classNames from "classnames";
import { ActionMeta, SelectComponentsConfig, InputActionMeta } from 'react-select';
import AsyncSelect from 'react-select/async';
import { getOptionValue, getOptionLabel } from "react-select/src/builtins";
import makeAnimated from 'react-select/animated';
import { Label } from "reactstrap";

import { BaseFormInput } from "./form-types";
import { FormControlWrapper } from "./form-control-wrapper";
import { FormError } from "./form-error";
import { getComponents } from './react-select-helper';

export interface FormAsyncSelectProps<T = any> extends BaseFormInput<T> {
  components?: SelectComponentsConfig<any>
  hideBaseClassName?: boolean
  className?: string
  label?: string
  placeholder?: string
  value?: any
  inputValue?: string
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void
  onChange?: (value: any, action: ActionMeta<any>) => void
  onBlur?: (e: any) => void
  defaultValue?: any
  searchPromise: (inputValue: string, callback?: (options: any[]) => void) => Promise<any>
  getOptionValue?: getOptionValue<any>
  getOptionLabel?: getOptionLabel<any>
  isClearable?: boolean
  disabled?: boolean
  isMulti?: boolean
}

let requestTimer: any = null;

export function FormAsyncSelect<T = any>(props: FormAsyncSelectProps<T>) {

  const { onChange, name, label, className, error, showError, defaultValue, searchPromise,
    hideBaseClassName, placeholder, components, getOptionValue, getOptionLabel, disabled, ...rest } = props;

  const classes = classNames({
    'form-async-select': hideBaseClassName,
    [className!]: className !== undefined
  });

  const handleChange = (value: any, action: ActionMeta<any>) => {
    if (onChange) {
      onChange(value, action);
    }
  }

  const handleLoadOptions = (inputValue: string) => {
    if (requestTimer) clearTimeout(requestTimer);
    return new Promise((resolve) => {
      requestTimer = setTimeout(() => searchPromise(inputValue).then(r => resolve(r)), 500);
    });
  };

  const invalid = error && showError ? true : false;

  return (
    <FormControlWrapper name={name as any} className={classes} invalid={invalid}>
      {label && <Label for={name as any}>{label}</Label>}
      <AsyncSelect
        // menuPortalTarget={document.body}
        inputId={name as any}
        loadOptions={handleLoadOptions}
        classNamePrefix={'form-multi-select'}
        isDisabled={disabled}
        textFieldProps={{
          name: name,
        }}
        cacheOptions
        getOptionValue={!getOptionValue ? (v: any) => v.value : getOptionValue}
        getOptionLabel={!getOptionLabel ? (v: any) => v.label : getOptionLabel}
        onChange={handleChange}
        components={components || getComponents(makeAnimated())}
        placeholder={placeholder || 'Start typing to search...'}
        {...rest}
      />
      <FormError errorMessage={error} show={showError} />
    </FormControlWrapper>


  );
}