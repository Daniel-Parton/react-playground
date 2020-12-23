import React from "react";
import MaskedInput from 'react-text-mask';
import classNames from "classnames";
import { Input as BootstrapInput, Label } from "reactstrap";
import { IconType } from 'react-icons';

import FormErrorMessage from "./form-error";
import FormControlWrapper from "./form-control-wrapper";
import { BaseFormInput } from "./form-types";
import FormInputSkeleton from "../loading-skeleton/form-input-skeleton";

export interface FormDateInputProps extends BaseFormInput {
  iconLeft?: IconType
  iconRight?: IconType
  inputClassName?: string
  afterInputContent?: any
  showLoadingSkeleton?: boolean
  placeholder?: string

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

const FormDateInput: React.FC<FormDateInputProps> = (props) => {
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
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          name={name as string}
          {...rest}
          placeholder='DD/MM/YYYY'
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

      <FormErrorMessage errorMessage={error} show={showError} />
    </FormControlWrapper>
  );
}

export default FormDateInput;