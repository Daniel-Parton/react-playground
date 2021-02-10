import React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string
  errorMessage?: string
  show?: boolean
}

export const FormError: React.FC<Props> = ({ errorMessage, show, className, ...rest }) => {

  const classes = classNames({
    'form-error-message': true,
    'd-none': !errorMessage || !show,
    [className!]: className !== undefined
  });

  return <span {...rest} className={classes}>{errorMessage}</span>;
};