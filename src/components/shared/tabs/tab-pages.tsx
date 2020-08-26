import React, { useEffect } from "react";
import classNames from "classnames";
import useReactRouter from 'use-react-router';
import { Route } from "react-router";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Row, Nav, NavItem, TabContent, TabPane, NavLink, Col } from "reactstrap";

export interface TabPageDefinition {
  label: string
  link: string
  component: any
  exact?: boolean
  icon?: IconDefinition
}

interface TabPagesProps {
  tabs: TabPageDefinition[]
  center?: boolean
  redirectFromBase?: boolean
  alternativeBase?: string
}

const TabPages: React.FC<TabPagesProps> = (props) => {

  const { tabs, redirectFromBase, center, alternativeBase } = props;
  const { location, match, history } = useReactRouter();

  //State for currentTab
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const handleTabChange = (newTab: number) => {
    if (newTab !== currentTab) {
      setCurrentTab(newTab);
    }
  }


  useEffect(() => {

    //Ensure current tab based on route is selected.  Takes into account browser back, forward and full reload
    const currentTabLink = tabs[currentTab].link.toLowerCase();
    const currentPath = location.pathname.toLowerCase();
    if (currentTabLink !== currentPath) {

      //Check for absoulte path first
      const index = tabs.findIndex(t => t.link.toLowerCase() === currentPath);
      if (index >= 0) {
        handleTabChange(index)
      }
      //Check for relative path
      else {
        const allrouteParts = currentPath.split('/').filter(v => v);
        const allRoutesLastIndex = allrouteParts.length - 1;
        const matchRouteParts = match.path.split('/').filter(v => v);
        const lastMatchPath = matchRouteParts[matchRouteParts.length - 1];


        //Finds the base route of the page so we can start checking route parts after
        //We are recursively checking the parts after the
        let basePartIndex = allrouteParts.findIndex(p => p.toLowerCase() === lastMatchPath.toLowerCase());
        const basePartIsNotLastPart = basePartIndex > -1 && basePartIndex < allRoutesLastIndex;
        if (basePartIsNotLastPart) {
          let stillChecking = true;
          let checkingRouteBase = match.path;
          while (stillChecking) {
            const currentRoute = `${checkingRouteBase}/${allrouteParts[basePartIndex + 1]}`.toLowerCase();
            const currentRouteIndex = props.tabs.findIndex(t => t.link.toLowerCase() === currentRoute);
            if (currentRouteIndex > -1) {
              handleTabChange(currentRouteIndex);
              stillChecking = false;
            } else {
              if (basePartIndex + 1 >= allRoutesLastIndex) {
                stillChecking = false;
              }
              basePartIndex++;
              checkingRouteBase = currentRoute;
            }
          }
        }
      }
    }

    //Redirect to first tab if on the base route
    if (redirectFromBase && (location.pathname === match.url || location.pathname === alternativeBase)) {
      history.replace(tabs[0].link);
    }

  }, [alternativeBase, location.pathname, match.path, match.url]);

  const changeTab = (index: number) => {
    if (index === currentTab) return;
    const newPage = tabs[index];
    history.push(newPage.link);
    handleTabChange(index);
  }

  return (
    <Row>
      <Col xs={!center ? 12 : undefined}>
        <Nav tabs>
          {tabs.map((t, index) => (
            <NavItem key={index} className='clickable'>
              <NavLink
                className={classNames({ 'active': currentTab === index })}
                onClick={() => changeTab(index)}
              >
                {t.label}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={99}>
          <TabPane tabId={99}>
            <div className='p-3'>
              {tabs.map((p, i) => (
                <div className='tab-page' key={i}>
                  <Route exact={p.exact} path={p.link} component={p.component} />
                </div>
              ))}
            </div>
          </TabPane>
        </TabContent>
      </Col>
    </Row>
  );
};

export default TabPages;