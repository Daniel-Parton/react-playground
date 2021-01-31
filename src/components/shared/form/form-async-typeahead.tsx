import React from "react";
import classNames from "classnames";
import makeAnimated from 'react-select/animated';

import { FormAsyncSelectProps, FormAsyncSelect } from "./form-async-select";
import { getComponents } from './react-select-helper';

export interface FormAsyncTypeaheadProps<T = any> extends Omit<FormAsyncSelectProps, 'name'> {
  name: keyof T
}

export function FormAsyncTypeahead<T = any>(props: FormAsyncTypeaheadProps<T>) {

  const { components, className, ...rest } = props;

  const classes = classNames({
    'form-async-typeahead': true,
    [className!]: className !== undefined
  });

  return (
    <FormAsyncSelect
      components={getComponents(makeAnimated(), { hideDropdown: true })}
      className={classes}
      {...rest}
    />
  );
}