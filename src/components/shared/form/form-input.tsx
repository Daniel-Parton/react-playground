import React from "react";
import classNames from "classnames";
import { Input as BootstrapInput, Label, CSSModule } from "reactstrap";
import { IconType } from 'react-icons';

import { FormError } from "./form-error";
import { FormControlWrapper } from "./form-control-wrapper";
import { BaseFormInput } from "./form-types";
import FormInputSkeleton from "../loading-skeleton/form-input-skeleton";

export interface FormInputProps<TFormValues = any> extends BaseFormInput<TFormValues> {
  iconLeft?: IconType
  iconRight?: IconType
  inputClassName?: string
  afterInputContent?: any
  showLoadingSkeleton?: boolean

  bsSize?: 'lg' | 'sm';
  state?: string;
  valid?: boolean;
  invalid?: boolean;
  tag?: string | React.ReactType;
  innerRef?: React.Ref<HTMLInputElement>;
  plaintext?: boolean;
  addon?: boolean;
  className?: string;
  cssModule?: CSSModule;

  disabled?: boolean
  placeholder?: string
  type?: string
  value?: any
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export function FormInput<TFormValues = any>(props: FormInputProps<TFormValues>) {
  const { name, iconLeft, iconRight, className, inputClassName,
    label, error, showError, afterInputContent, showLoadingSkeleton, type, disabled, ...rest } = props;

  const classes = classNames({
    'form-input': true,
    'input-with-icon': iconLeft !== undefined || iconRight !== undefined,
    'input-with-icon-left': iconLeft !== undefined,
    'input-with-icon-right': iconRight !== undefined,
    [className!]: className !== undefined,
  });

  const invalid = error && showError ? true : false;

  if (showLoadingSkeleton) {
    return <FormInputSkeleton className={classes} hasLabel={label ? true : false} />;
  }

  const IconLeft = iconLeft;
  const IconRight = iconRight;

  return (
    <FormControlWrapper name={name as string} className={classes} invalid={invalid}>
      {label && <Label for={name as string}>{label}</Label>}
      <div className='d-flex'>
        <BootstrapInput
          {...rest}
          type={type as any}
          name={name as string}
          className={inputClassName}
          disabled={disabled}
        />
        {afterInputContent && <div className='form-input-post-content'>{afterInputContent}</div>}
      </div>
      {IconLeft && <IconLeft className='input-icon-left' />}
      {IconRight && <IconRight className='input-icon-right' />}
      <FormError errorMessage={error} show={showError} />
    </FormControlWrapper>
  );
}