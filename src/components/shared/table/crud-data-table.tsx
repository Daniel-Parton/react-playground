import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import UncontrolledDataTable, { DataTableColumnDefinition } from './data-table/uncontrolled-data-table';
import DataTableActions from './data-table-actions';
import { ModalAutoForm } from '..';
import { useToasts } from 'react-toast-notifications';
import ToastHelper from '../../../helpers/toast-helper';
import { toStackedForm } from '../form/auto-form/auto-form-helper';
import { AutoFormOptions, AutoFormInputType, AutoFormPropertyDefinition } from '../form/auto-form/auto-form-types';

export interface CrudColumn<T> extends DataTableColumnDefinition<T> {
  formOptions: AutoFormOptions
  formControlType: AutoFormInputType
}

export interface CrudDataTableProps<T> {
  loading?: boolean
  className?: string
  dataIdProperty: keyof T
  data: T[]
  columns: CrudColumn<T>[]
  addPromise: (data: T) => Promise<T>
  editPromise: (data: T) => Promise<T>
  deletePromise: (data: T) => Promise<T>

  reloadPromise: () => Promise<T[]>
  addHeader: string
  editHeader: (data: T) => string
}

export interface ModalState<T> {
  open: boolean
  mode: 'edit' | 'add'
  data?: T
}

function CrudDataTable<T>(props: CrudDataTableProps<T>) {

  const { className, columns, dataIdProperty, data, addHeader, editHeader, addPromise, editPromise, deletePromise, reloadPromise, loading } = props;

  const [tableData, setTableData] = useState<T[]>([]);
  const [modalState, setModalState] = useState<ModalState<T>>({ open: false, mode: 'add' });

  useEffect(() => setTableData(data), [data])

  const toastHelper = new ToastHelper(useToasts());

  const handleEditClick = (model: T) => setModalState((ps) => ({ ...ps, open: true, data: model, mode: 'edit' }));

  async function handleDeleteClick(model: T) {
    await deletePromise(model);
    setTableData((td) => {
      const newTableData = [...td];
      const index = newTableData.findIndex(e => e[dataIdProperty] === model[dataIdProperty]);
      if (index >= 0) newTableData.splice(index, 1);
      return newTableData;
    });
  };

  const handleSubmitSuccess = (response: any) => {
    const isEdit = modalState.mode === 'edit';
    setTableData((td) => {
      if (!isEdit) {
        td.push(response);
      } else {
        const index = td.findIndex(e => e[dataIdProperty] === response[dataIdProperty]);
        if (index >= 0) td[index] = response;
      }
      return td;
    });

    setModalState(ps => ({ ...ps, open: false }));
    toastHelper.success(`${isEdit ? 'Updated' : 'Added'}`);
  }

  async function handleReload() {
    const items = await reloadPromise();
    setTableData(items);
  }

  const classes = classNames({
    'crud-data-table': true,
    [className!]: className !== undefined
  });

  const formProps = columns.map(c => {
    const definition: AutoFormPropertyDefinition = {
      name: c.key as string,
      type: c.formControlType,
      display: c.header || c.key as string,
      options: c.formOptions
    };
    return definition;
  });

  const resolveHeader = () => {
    if (modalState.mode === 'add') return addHeader;
    return editHeader(modalState.data!);
  }

  return (
    <React.Fragment>
      <UncontrolledDataTable<T>
        className={classes}
        loading={loading}
        toolbarProps={{
          onAdd: () => setModalState((ps) => ({ ...ps, open: true, data: undefined, mode: 'add' })),
          onReload: handleReload
        }}
        columns={columns}
        data={tableData}
        actions={[
          DataTableActions.edit(handleEditClick, undefined, 'transparent'),
          DataTableActions.delete(handleDeleteClick, undefined, 'transparent')
        ]}
        dataIdProperty={dataIdProperty}
      />
      <ModalAutoForm
        header={resolveHeader()}
        submitButtonText={modalState.mode === 'edit' ? 'Update' : 'Add'}
        open={modalState.open}
        initialValues={modalState.data}
        onClose={() => setModalState((ps) => ({ ...ps, open: !ps.open }))}
        onBack={() => setModalState((ps) => ({ ...ps, open: false }))}
        onSubmitPromise={(values: T) => {
          const isEdit = modalState.mode === 'edit';
          const promise = isEdit ? editPromise : addPromise;
          return promise(values);
        }}
        onSubmitSuccess={handleSubmitSuccess}
        rows={toStackedForm(formProps)}
      />
    </React.Fragment>
  )
}

export default CrudDataTable;