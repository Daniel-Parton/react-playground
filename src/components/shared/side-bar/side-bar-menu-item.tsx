import React from 'react';
import classNames from 'classnames';

interface SideBarMenuItemProps {
  id?: string
  className?: string
}
const SideBarMenuItem: React.FC<SideBarMenuItemProps> = ({ className, children, ...rest }) => {

  const classes = classNames({
    'sidebar-menu-item': true,
    [className!]: className !== undefined,
  });

  return (
    <li className={classes} list-role='menu-item' {...rest}>
      {children}
    </li>
  );
}

export default SideBarMenuItem;