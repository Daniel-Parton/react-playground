import React from 'react';
import classNames from 'classnames';
import { FaTimesCircle, FaInfoCircle, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

interface AlertProps {
  className?: string
  message?: string
  variant?: 'info' | 'success' | 'error' | 'warning'
  center?: boolean
  id?: string
  errorIconExclamation?: boolean
}

const Alert: React.FC<AlertProps> = ({ id, center, className, message, variant = 'info', children, ...rest }) => {

  const compiledClass = classNames({
    'alert': true,
    'text-center': center,
    'alert-danger': variant === 'error',
    'alert-info': variant === 'info',
    'alert-warning': variant === 'warning',
    'alert-success': variant === 'success',
    [className!]: className !== undefined
  });

  return (
    <div className={compiledClass} id={id} {...rest}>
      {variant === 'error' && <FaTimesCircle />}
      {variant === 'warning' && <FaExclamationCircle />}
      {variant === 'info' && <FaInfoCircle />}
      {variant === 'success' && <FaCheckCircle />}
      {message}
      {children}
    </div>
  );
}

export default Alert;