import classNames from 'classnames';
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import SideBarLink, { SideBarLinkProps } from './side-nav-link';
import * as StringHelper from '../../../helpers/string-helper';
import SideBarMenuItem from './side-bar-menu-item';
import { SidBarVariant } from './side-drawer';


interface SideBarProps {
  className?: string
  headingImage?: any
  subHeading?: string
  isOpen: boolean
  links: SideBarLinkProps[]
  variant?: SidBarVariant
}

const SideBar: React.FC<SideBarProps> = ({ headingImage, isOpen, links, className, variant = 'light' }) => {

  const getmenuItemId = (link: SideBarLinkProps) => StringHelper.replaceSpacesWithDashes(`side-bar-menu-item-${link.text}`).toLowerCase();

  const classes = classNames({
    'sidebar-container': true,
    'sidebar-collapsed': !isOpen,
    [`sidebar-${variant}`]: variant !== undefined,
    [className!]: className !== undefined
  });

  return (
    <div className={classes}>
      <div className='sidebar'>
        <div className="sidebar-header">
          {headingImage}
        </div>
        <div className='sidebar-content'>
          <ul className='sidebar-menu' role='menu'>
            {links.map((link, index) => (
              <React.Fragment key={index}>
                <SideBarMenuItem id={getmenuItemId(link)} className={link.className}>
                  <SideBarLink variant={variant} {...link} />
                </SideBarMenuItem>
                {!isOpen && !link.children && <UncontrolledTooltip placement='right' target={getmenuItemId(link)}>{link.text}</UncontrolledTooltip>}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div >
  );
}

export default SideBar;