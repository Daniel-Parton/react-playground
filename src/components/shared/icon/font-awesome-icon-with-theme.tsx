import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, Props } from "@fortawesome/react-fontawesome";

export interface FontAwesomeIconPrimaryProps extends Props {
  color?: 'primary' | 'secondary' | 'danger' | 'success'
}

const FontAwesomeIconWithTheme: React.FC<FontAwesomeIconPrimaryProps> = ({ color, className, ...rest }) => {

  const compiledClass = classNames({
    'icon-with-theme': true,
    'icon-primary': color === 'primary',
    'icon-secondary': color === 'secondary',
    'icon-danger': color === 'danger',
    'icon-success': color === 'success',
    [className!]: className !== undefined
  });


  return <FontAwesomeIcon {...rest} className={compiledClass} />;
}

export default FontAwesomeIconWithTheme;