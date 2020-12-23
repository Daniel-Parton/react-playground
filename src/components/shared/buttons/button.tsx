import classNames from 'classnames';
import React, { useState, memo } from 'react';
import { v4 } from 'uuid';
import { Button as BootStrapButton, UncontrolledTooltip } from 'reactstrap';
import Skeleton from 'react-loading-skeleton';
import { IconType } from 'react-icons';

import { ButtonVariant, BootstrapButtonVariant } from './shared';

export interface ButtonProps {
  key?: any
  id?: string
  icon?: IconType
  className?: string
  toolTip?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  rounded?: boolean
  bsVariant?: BootstrapButtonVariant
  variant?: ButtonVariant
  disabled?: boolean
  text?: string
  style?: any
  noHover?: boolean
  iconVariant?: 'primary' | 'secondary'
  showLoadingSkeleton?: boolean
  children?: any
  type?: 'button' | 'submit'
  small?: boolean
}

const Button: React.FC<ButtonProps> = ({ noHover, iconVariant, id,
  rounded, variant, bsVariant, icon, className, children, toolTip, text,
  showLoadingSkeleton, onClick, type = 'button', small = false, ...rest }) => {

  const [compiledId] = useState(id || `a${v4()}`);

  const classes = classNames({
    'btn-icon-only': icon && !text && !children,
    'btn-rounded': rounded,
    'btn-no-hover': noHover,
    [`btn-${variant}`]: variant !== undefined,
    [className!]: className !== undefined
  });

  const iconClasses = classNames({
    'mr-2': text !== undefined || children !== undefined,
    [`icon-${iconVariant}`]: iconVariant !== undefined,
  });

  if (showLoadingSkeleton) {
    return (
      <BootStrapButton className={classes} style={{ pointerEvents: 'none' }} {...rest}>
        {showLoadingSkeleton && <Skeleton />}
      </BootStrapButton>
    );
  }

  const Icon = icon;

  return (
    <React.Fragment>
      <BootStrapButton size={small ? 'sm' : undefined} id={compiledId} className={classes} color={bsVariant} onClick={onClick} type={type} {...rest}>
        {Icon && <Icon className={iconClasses} />}
        {text}
        {children}
      </BootStrapButton>
      {toolTip && <UncontrolledTooltip placement="top" target={compiledId}>{toolTip}</UncontrolledTooltip>}
    </React.Fragment>
  );
}

export default memo(Button);