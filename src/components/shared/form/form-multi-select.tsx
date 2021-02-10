import React from "react";
import classNames from "classnames";
import Select, { ActionMeta } from 'react-select';
import makeAnimated from 'react-select/animated';
import { BaseFormInput } from "./form-types";
import { FormControlWrapper } from "./form-control-wrapper";
import { FormError } from "./form-error";
import { Label } from "reactstrap";
import { OptionModel } from "../../../types/shared-types";
import { getComponents } from './react-select-helper';

export interface FormMultiSelectProps<TFormValues = any> extends BaseFormInput<TFormValues> {
  label?: string
  disabled?: boolean
  placeholder?: string
  options: OptionModel<any>[]
  value?: any
  onChange?: (value: any, action: ActionMeta<any>) => void
  onBlur?: (e: any) => void
  className?: string
  defaultValue?: any
  afterLabelContent?: any
}

export function FormMultiSelect<T = any>(props: FormMultiSelectProps<T>) {

  const { onChange, name, value, label, className, error, showError, defaultValue, afterLabelContent, disabled, ...rest } = props;

  const [ownValue, setOwnValue] = React.useState<any>(defaultValue);

  const classes = classNames({
    'form-multi-select': true,
    [className!]: className !== undefined
  });

  const handleChange = (value: any, action: ActionMeta<any>) => {
    setOwnValue(value);

    if (onChange) {
      onChange(value, action);
    }
  }

  const invalid = error && showError ? true : false;

  return (
    <FormControlWrapper name={name as string} className={classes} invalid={invalid}>
      {label && <Label for={name as string}>{label}</Label>}
      {afterLabelContent}
      <Select
        // menuPortalTarget={document.body}
        inputId={name as string}
        classNamePrefix='form-multi-select'
        isDisabled={disabled}
        value={value || ownValue}
        getOptionValue={(v) => v.value}
        getOptionLabel={(v) => v.label}
        onChange={handleChange}
        components={getComponents(makeAnimated())}
        {...rest}
        isMulti
        isClearable
      />
      <FormError errorMessage={error} show={showError} />
    </FormControlWrapper>


  );
}