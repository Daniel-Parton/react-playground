import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useToasts } from 'react-toast-notifications';

import ToastHelper from '../../../helpers/toast-helper';
import DashboardPage from '../../hoc/dashboard-page';
import { CrudDataTable } from '../../shared';
import { generateTableItems, SimpleTableValues } from './table-helper';
import { email, maxCharLength, required } from '../../shared/form/validators';

interface CrudTablePageProps extends RouteComponentProps { }

const CrudTablePage: React.FC<CrudTablePageProps> = (props) => {

  const toastHelper = new ToastHelper(useToasts());
  const [data, setData] = useState<SimpleTableValues[]>([]);

  const getData = () => generateTableItems(10);
  const loadData = () => setData(getData());

  useEffect(() => {
    setTimeout(() => loadData(), 1000);
  }, []);

  return (
    <CrudDataTable<SimpleTableValues>
      loading={!data.length}
      addPromise={(v) => Promise.resolve(v)}
      editPromise={v => Promise.resolve(v)}
      addHeader='Add New Person'
      editHeader='Update Person'
      reloadPromise={() => {
        toastHelper.success('New Data Loaded!');
        return Promise.resolve(getData());
      }}
      data={data}
      dataIdProperty='id'
      columns={[
        { key: 'id', searchable: true, header: 'Id', filters: [{ type: 'NumberRange' }], formControlType: 'NumberInput', formOptions: { validators: [required()] } },
        { key: 'name', searchable: true, header: 'Name', filters: [{ type: 'StringAll' }], formControlType: 'TextInput', formOptions: { validators: [required(), maxCharLength(200)] } },
        { key: 'email', searchable: true, header: 'Email', filters: [{ type: 'StringAll' }], formControlType: 'TextInput', formOptions: { validators: [required(), email(), maxCharLength(2000)] } },
      ]}
    />
  );
}

export default DashboardPage(CrudTablePage);
