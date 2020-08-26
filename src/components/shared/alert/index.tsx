import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faInfoCircle, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

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
      {variant === 'error' && <FontAwesomeIcon size='xs' className='alert-icon' icon={faTimesCircle} />}
      {variant === 'warning' && <FontAwesomeIcon className='alert-icon' icon={faExclamationCircle} />}
      {variant === 'info' && <FontAwesomeIcon className='alert-icon' icon={faInfoCircle} />}
      {variant === 'success' && <FontAwesomeIcon className='alert-icon' icon={faCheckCircle} />}
      {message}
      {children}
    </div>
  );
}

export default Alert;