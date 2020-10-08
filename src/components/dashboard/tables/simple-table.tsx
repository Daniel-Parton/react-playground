import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useToasts } from 'react-toast-notifications';

import ToastHelper from '../../../helpers/toast-helper';
import DashboardPage from '../../hoc/dashboard-page';
import { generateTableItems, SimpleTableValues } from './table-helper';
import { DataTable } from '../../shared';

interface SimpleTableProps extends RouteComponentProps {
}

const SimpleTable: React.FC<SimpleTableProps> = () => {

  const toastHelper = new ToastHelper(useToasts());
  const [data, setData] = useState<SimpleTableValues[]>([]);
  const loadData = () => setData(generateTableItems(100));

  useEffect(() => {
    setTimeout(() => loadData(), 1000);
  }, []);


  return (
    <DataTable<SimpleTableValues>
      loading={!data.length}
      toolbarProps={{
        onReload: () => {
          loadData();
          toastHelper.success('New Data Loaded!')
        }
      }}
      columns={[
        { key: 'id', searchable: true, header: 'Id', filters: [{ type: 'NumberRange' }] },
        { key: 'name', searchable: true, header: 'Name', filters: [{ type: 'StringAll' }] },
        { key: 'email', searchable: true, header: 'Email', filters: [{ type: 'StringAll' }] },
      ]}
      data={data}
      dataIdProperty='id'
      pageOptions={{ itemsPerPage: 30 }}
    />
  );
}

export default DashboardPage(SimpleTable);
