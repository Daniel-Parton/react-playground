import React from 'react';
import { RouteComponentProps } from 'react-router';

import { TabPages } from '../../shared';
import NestedTab from './nested-tab';

interface TabsPageProps extends RouteComponentProps {
}

const TabsPage: React.FC<TabsPageProps> = (props) => {

  const { match: { path } } = props;

  return (
    <TabPages
      redirectFromBase
      tabs={[
        { label: 'Tab 1', link: `${path}/1`, component: () => <div />, exact: true },
        { label: 'Tab 2', link: `${path}/2`, component: () => <div />, exact: true },
        { label: 'Tab 3', link: `${path}/3`, component: () => <div />, exact: true },
        { label: 'Tab 4', link: `${path}/4`, component: NestedTab },
      ]}
    />
  );
}

export default TabsPage;
