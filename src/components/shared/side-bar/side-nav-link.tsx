import React from 'react';
import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SidBarVariant } from './side-drawer';

export interface SideBarLinkWithComponentProps extends SideBarLinkProps {
  component: any
}

export interface BaseSideBarLinkProps {
  icon: IconDefinition
  text: string
  target?: string
  onClick?: () => void
  className?: string
  variant?: SidBarVariant
}

export interface SideBarLinkProps extends BaseSideBarLinkProps {
  children?: BaseSideBarLinkProps[]
}


const SideBarLink: React.FC<SideBarLinkProps> = ({ icon, variant = 'light', text, target, onClick, className, children }) => {

  const classes = classNames({
    'sidebar-link-item': true,
    [`sidebar-link-item-${variant}`]: variant !== undefined,
    [className!]: className !== undefined,
  });

  return (
    <React.Fragment>
      {target && (
        <NavLink to={target} onClick={onClick} className={classes}>
          <div className='sidebar-link-item-icon'><FontAwesomeIcon icon={icon} /></div>
          <div className='sidebar-link-item-text'>{text}</div>
        </NavLink>
      )}
      {!target && (
        <a className={classes} onClick={onClick}>
          <div className='sidebar-link-item-icon'><FontAwesomeIcon icon={icon} /></div>
          <div className='sidebar-link-item-text'>{text}</div>
        </a>
      )}

    </React.Fragment>
  );
}

export default SideBarLink;