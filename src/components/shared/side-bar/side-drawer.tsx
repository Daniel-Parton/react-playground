import React from 'react';
import classNames from 'classnames';
import Button from '../buttons/button';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import SideBarLink, { SideBarLinkProps } from './side-nav-link';
import SideBarMenuItem from './side-bar-menu-item';

export type SidBarVariant = 'dark' | 'light';

interface SideBarDrawerProps {
  className?: string
  overlayClassName?: string
  heading?: string
  header?: any
  open: boolean
  onClose: () => void
  topContent?: any
  links?: SideBarLinkProps[]
  position: 'right' | 'left',
  variant?: SidBarVariant
  onLinkClick?: () => void
}

const SideBarDrawer: React.FC<SideBarDrawerProps> = ({ links, heading, header, open, position, onClose, topContent, className, overlayClassName, variant, onLinkClick }) => {
  const classes = classNames({
    'side-drawer': true,
    'side-drawer-open': open,
    'side-drawer-left': position === 'left',
    'side-drawer-right': position === 'right',
    [`side-drawer-${variant}`]: variant !== undefined,
    [className!]: className !== undefined
  });

  const overlayClasses = classNames({
    'side-drawer-overlay': true,
    'side-drawer-overlay-open': open,
    [overlayClassName!]: overlayClassName !== undefined
  });

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.bubbles = false;
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <React.Fragment>
      <div className={classes}>
        <div className='side-drawer-header'>
          <div className='side-drawer-header-title'><h5>{heading}</h5></div>
          {header}
          <div className='side-drawer-header-close'>
            <Button icon={faTimes} onClick={onClose} variant='transparent' />
          </div>
        </div>
        <hr />
        <div className='side-drawer-content' onClick={handleContentClick}>
          {topContent && (
            <React.Fragment>
              {topContent}
              <hr />
            </React.Fragment>
          )}
          {links && links.map((link, index) => {
            const overridedOnClick = () => {
              if (onLinkClick) onLinkClick();
              if (link.onClick) link.onClick();
            }

            return (
              <SideBarMenuItem key={index} className={link.className}>
                <SideBarLink variant={variant} {...link} onClick={overridedOnClick} />
              </SideBarMenuItem>
            )
          })}
        </div>
      </div>
      <div className={overlayClasses} onClick={onClose} />
    </React.Fragment>

  );
}

export default SideBarDrawer;