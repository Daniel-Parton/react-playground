import React from 'react';
import { RouteComponentProps } from 'react-router';
import { TabPages } from '../../shared';

interface NestedTabProps extends RouteComponentProps {
}

const NestedTab: React.FC<NestedTabProps> = (props) => {

  const { match: { path } } = props;

  return (
    <TabPages
      redirectFromBase
      tabs={[
        { label: 'Nested Tab 1', link: `${path}/1`, component: () => <div />, exact: true },
        { label: 'Nested Tab 2', link: `${path}/2`, component: () => <div />, exact: true },
        { label: 'Nested Tab 3', link: `${path}/3`, component: () => <div />, exact: true },
        { label: 'Nested Tab 4', link: `${path}/4`, component: () => <div />, exact: true },
      ]}
    />
  );
}

export default NestedTab;
