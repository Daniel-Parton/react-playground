import React from 'react';
import classNames from 'classnames';

import { SideDrawer, SideBar } from '../shared';
import { SideBarLinkProps } from '../shared/side-bar/side-nav-link';

interface DashboardHeaderImageProps {
  onClick?: () => void
}

export interface DashboardNavBarProps {
  path: string
  links: SideBarLinkProps[]
  open: boolean
  mobileOpen: boolean
  onToggle: () => void
  onClickHeaderImage?: () => void
}


const DashboardHeaderImage: React.FC<DashboardHeaderImageProps> = ({ onClick }) => {
  const classes = classNames({
    'img-responsive': true,
    'clickable': onClick !== undefined
  });

  return <img alt='logo' onClick={onClick} className={classes} style={{ width: '50px' }} src='/images/logo512.png' />;
};

const DashboardNavBar: React.FC<DashboardNavBarProps> = ({ path, links, open, mobileOpen, onToggle, onClickHeaderImage }) => {

  return (
    <React.Fragment>
      <SideBar
        className='main-nav-bar'
        isOpen={open}
        links={links}
        headingImage={<DashboardHeaderImage onClick={onClickHeaderImage} />}
        variant='dark'
      />
      <SideDrawer
        className='mobile-nav-bar'
        overlayClassName='mobile-nav-bar-overlay'
        position='left'
        onLinkClick={onToggle}
        open={mobileOpen}
        header={(
          <DashboardHeaderImage onClick={onClickHeaderImage} />
        )}
        links={links}
        onClose={onToggle}
      />
    </React.Fragment>
  );
}

export default DashboardNavBar;
