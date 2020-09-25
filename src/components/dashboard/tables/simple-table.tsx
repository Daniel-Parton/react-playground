import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { uniqueNamesGenerator, animals, starWars } from 'unique-names-generator';

import { useToasts } from 'react-toast-notifications';
import ToastHelper from '../../../helpers/toast-helper';

import DashboardPage from '../../hoc/dashboard-page';
import { AutoForm, CardSimple, DataTable } from '../../shared';
import { email, maxCharLength, required } from '../../shared/form/validators';

interface SimpleTableProps extends RouteComponentProps {
}

interface SimpleTableValues {
  id: number
  name: string
  email: string
}

const generateTableItem = (id: number) => {
  const firstName = uniqueNamesGenerator({ dictionaries: [starWars], separator: '', length: 1, style: 'capital' }).split(' ')[0];
  const surname = uniqueNamesGenerator({ dictionaries: [animals], separator: '', length: 1, style: 'capital' }).split(' ')[0];

  const item: SimpleTableValues = {
    id: id,
    name: `${firstName} ${surname}`,
    email: `${firstName}.${surname}@someemail.com`
  };
  return item;
}

const SimpleTable: React.FC<SimpleTableProps> = (props) => {

  const toastHelper = new ToastHelper(useToasts());

  const [data, setData] = useState<SimpleTableValues[]>([]);

  useEffect(() => {
    const newData: SimpleTableValues[] = [];
    for (let i = 1; i < 101; i++) {
      newData.push(generateTableItem(i))
    }
    setData(newData);
  }, []);

  return (
    <DataTable<SimpleTableValues>
      columns={[
        { key: 'id', searchable: true, header: 'Id', filters: [{ type: 'StringContains' }] },
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
