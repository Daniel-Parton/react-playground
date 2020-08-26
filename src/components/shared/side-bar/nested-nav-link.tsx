import React, { useState } from 'react';
import { Collapse, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export interface SideBarNavLinkProps {
  icon?: IconProp
  text: string
  target?: string
  items?: SideBarNavLinkProps[]
  className?: string
}
const SideBarNavLink: React.FC<SideBarNavLinkProps> = ({ className, icon, target, text, items }) => {

  const [collapsed, setCollapsed] = useState(true)
  const toggleNavbar = () => setCollapsed(!collapsed)

  const hasItems = items && items.length ? true : false;

  return (
    <div className={className}>
      <NavItem onClick={toggleNavbar} className={classNames({ 'menu-open': !collapsed })}>
        <NavLink tag={!hasItems ? Link : undefined} to={target}>
          {icon && <FontAwesomeIcon icon={icon} className="mr-3" />}
          {text}
          {hasItems && <FontAwesomeIcon icon={faChevronDown} className="mt-1 float-right" />}
        </NavLink>
      </NavItem>
      {hasItems && (
        <Collapse isOpen={!collapsed} navbar className={classNames('items-menu', { 'mb-1': !collapsed })}>
          {items!.map((item, index) => <SideBarNavLink className='pl-2' key={index} {...item} />)}
        </Collapse>
      )}
    </div>
  );
}

export default SideBarNavLink;