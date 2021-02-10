import React from 'react';
import classNames from 'classnames';
import { FormGroup, FormGroupProps } from 'reactstrap';

interface FormControlWrapperProps<T = any> extends Omit<FormGroupProps, 'name'> {
  invalid?: boolean
  name: keyof T
}

export function FormControlWrapper<T = any>(props: FormControlWrapperProps<T>) {
  const { className, invalid, children, name, ...rest } = props;
  const classes = classNames({
    'form-control-wrapper': true,
    'invalid': invalid,
    [className!]: className !== undefined
  });

  return (
    <FormGroup data-test={`form-control-${name as any}`} className={classes} {...rest as any} >
      {children}
    </FormGroup>
  );
};