import React from "react";
import classNames from "classnames";
import { Label } from "reactstrap";
import { v4 } from 'uuid';
import { IconType } from 'react-icons';

import { FormControlWrapper } from "./form-control-wrapper";

export interface FormDisplayProps {
  iconLeft?: IconType
  label?: string
  text?: string
  className?: string
  inline?: boolean
}

export const FormDisplay: React.FC<FormDisplayProps> = (props) => {
  const { iconLeft, className, label, text, children, inline, ...rest } = props;

  const classes = classNames({
    'form-display': true,
    'form-display-inline': inline,
    [className!]: className !== undefined,
  });

  const IconLeft = iconLeft;
  return (
    <FormControlWrapper name={text ?? v4()} className={classes} {...rest}>
      {label && <Label>{label}</Label>}
      {IconLeft && <IconLeft className='mr-2' />}
      {text && <div>{text}</div>}
      {children}
    </FormControlWrapper>
  );
}