import React from "react";
import MaskedInput from 'react-text-mask';
import classNames from "classnames";
import { Input as BootstrapInput, Label } from "reactstrap";
import { IconType } from 'react-icons';

import { FormError } from "./form-error";
import { FormControlWrapper } from "./form-control-wrapper";
import { BaseFormInput } from "./form-types";
import FormInputSkeleton from "../loading-skeleton/form-input-skeleton";

export interface FormMobilePhoneProps<TFormValues = any> extends BaseFormInput<TFormValues> {
  iconLeft?: IconType
  iconRight?: IconType
  inputClassName?: string
  placeholder?: string
  afterInputContent?: any
  showLoadingSkeleton?: boolean

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export function FormMobilePhone<TFormValues = any>(props: FormMobilePhoneProps<TFormValues>) {
  const { name, iconLeft, iconRight, className, inputClassName,
    label, error, showError, afterInputContent, showLoadingSkeleton, ...rest } = props;

  const classes = classNames({
    'form--date-input': true,
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
        <MaskedInput
          mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]}
          name={name as string}
          {...rest}
          placeholder='0___ ___ ___'
          render={(ref, props) => (
            <BootstrapInput
              innerRef={ref}
              {...props}
            />
          )}
        />
        {afterInputContent && <div className='form-input-post-content'>{afterInputContent}</div>}

      </div>
      {IconLeft && <IconLeft className='input-icon-left' />}
      {IconRight && <IconRight className='input-icon-right' />}
      <FormError errorMessage={error} show={showError} />
    </FormControlWrapper>
  );
}