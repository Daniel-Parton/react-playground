import React from 'react';
import { RouteComponentProps } from 'react-router';

import { TabPages } from '../../shared';

import SimpleTable from './simple-table';
import CrudTable from './crud-table';

interface TablesPageProps extends RouteComponentProps {
}

const TablesPage: React.FC<TablesPageProps> = (props) => {

  const { match: { path } } = props;

  return (
    <TabPages
      redirectFromBase
      tabs={[
        { label: 'Simple Table', link: `${path}/simple`, component: SimpleTable, exact: true },
        { label: 'Crud Table', link: `${path}/crud`, component: CrudTable, exact: true },
      ]}
    />
  );
}

export default TablesPage;
