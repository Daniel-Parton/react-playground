import React from "react";
import classNames from "classnames";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Row, Nav, NavItem, TabContent, TabPane, NavLink, Col } from "reactstrap";

export interface TabDefinition {
  label: string
  component: any
  icon?: IconDefinition
}

export interface TabsProps {
  tabs: TabDefinition[]
  variant?: 'full-width'
  center?: boolean
}

const Tabs: React.FC<TabsProps> = ({ tabs, center, variant }) => {

  //State for currentTab
  const [currentTab, setCurrentTab] = React.useState<number>(0);

  const handleTabChange = (newTab: number) => {
    if (newTab !== currentTab) {
      setCurrentTab(newTab);
    }
  }

  const classes = classNames({
    'mb-3': true,
    [`tabs-${variant}`]: variant !== undefined
  });

  return (
    <Row>
      <Col xs={!center ? 12 : undefined}>
        <Nav tabs className={classes}>
          {tabs.map((t, index) => (
            <NavItem key={index} className='clickable'>
              <NavLink
                className={classNames({ 'active': currentTab === index })}
                onClick={() => handleTabChange(index)}
              >
                {t.label}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={currentTab}>
          {tabs.map((t, index) => (
            <TabPane tabId={index}>
              {t.component}
            </TabPane>
          ))}
        </TabContent>
      </Col>
    </Row>
  );
};

export default Tabs;