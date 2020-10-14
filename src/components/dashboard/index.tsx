import React, { useState } from 'react';
import { RouteComponentProps, Route, Redirect } from 'react-router';
import { faUserTie, faSignOutAlt, faClipboardList, faBorderAll, faChartLine } from '@fortawesome/free-solid-svg-icons';
import Header from './layout/header';
import Footer from './layout/footer';
import { SideDrawer, ListItem } from '../shared';
import NavBar from './dashboard-nav-bar';
import { SideBarLinkWithComponentProps } from '../shared/side-bar/side-nav-link';

import TabsPage from './tabs';
import FormsPage from './forms';
import TablesPage from './tables';
import GraphsPage from './graphs';

export interface DashboardProps extends RouteComponentProps { }

const Dashboard: React.FC<DashboardProps> = (props) => {
  const [state, setState] = useState({
    navBarOpen: true,
    mobileNavBarOpen: false,
    rightSideBarOpen: false
  });

  const { match: { path }, location: { pathname }, history } = props;

  const toggleNavBar = () => setState((ps) => ({ ...ps, navBarOpen: !ps.navBarOpen, mobileNavBarOpen: !ps.mobileNavBarOpen }));
  const toggleRightSideBar = () => setState((ps) => ({ ...ps, rightSideBarOpen: !ps.rightSideBarOpen }));

  if (pathname === '/' || pathname === '/dashboard') return <Redirect to='/dashboard/tabs' />;

  const navLinks: SideBarLinkWithComponentProps[] = [
    { text: 'Tabs', icon: faBorderAll, target: `${path}/tabs`, component: TabsPage },
    { text: 'Forms', icon: faClipboardList, target: `${path}/forms`, component: FormsPage },
    { text: 'Tables', icon: faClipboardList, target: `${path}/tables`, component: TablesPage },
    { text: 'Graphs', icon: faChartLine, target: `${path}/graphs`, component: GraphsPage }
  ];


  return (
    <React.Fragment>
      <SideDrawer
        position='right'
        open={state.rightSideBarOpen}
        heading='User Settings'
        topContent={(
          <div className='user-info p-3'>
            <ListItem icon={faUserTie} primaryText='Guest' />
          </div>
        )}
        links={[
          { onClick: () => { }, text: 'Logout', icon: faSignOutAlt }
        ]}
        onClose={() => setState((ps) => ({ ...ps, rightSideBarOpen: false }))}
      />
      <NavBar
        links={navLinks}
        path={path}
        mobileOpen={state.mobileNavBarOpen}
        open={state.navBarOpen}
        onToggle={toggleNavBar}
        onClickHeaderImage={() => history.push('/')}
      />
      <div className='main-content'>
        <Header
          navBarOpen={state.navBarOpen}
          brandText='React Playground'
          onToggleLeftSideBar={toggleNavBar}
          onToggleRightSideBar={toggleRightSideBar}
        />
        {navLinks.map((route, i) => <Route key={i} path={route.target!} component={route.component} />)}
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
