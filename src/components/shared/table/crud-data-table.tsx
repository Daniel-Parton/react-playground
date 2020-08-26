import React, { useState } from 'react';
import classNames from 'classnames';
import DataTable, { DataTableColumnDefinition } from './data-table';
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
  className?: string
  dataIdProperty: keyof T
  data: T[]
  columns: CrudColumn<T>[]
  entityName: string
  addPromise: (data: T) => Promise<T>
  editPromise: (data: T) => Promise<T>
  reloadPromise: () => Promise<T[]>
}

export interface CrudDataTableState<T> {
  tableData: T[]
  modal: {
    open: boolean
    mode: 'edit' | 'add'
    data?: T
  }
}

function CrudDataTable<T>(props: CrudDataTableProps<T>) {

  const { className, columns, dataIdProperty, data, entityName, addPromise, editPromise, reloadPromise } = props;

  const [state, setState] = useState<CrudDataTableState<T>>({
    modal: { open: false, mode: 'add' },
    tableData: [...data]
  });

  const toastHelper = new ToastHelper(useToasts());

  const handleEditClick = (values: T) => {
    setState((ps) => {
      const newState = { ...ps };
      newState.modal.open = true;
      newState.modal.data = values;
      newState.modal.mode = 'edit';
      return newState;
    });
  }

  const handleSubmitSuccess = (response: any) => {
    const isEdit = state.modal.mode === 'edit';
    const newState = { ...state };
    if (!isEdit) {
      newState.tableData.push(response);
    } else {
      const index = newState.tableData.findIndex(e => e[dataIdProperty] === response[dataIdProperty]);
      if (index >= 0) {
        (newState.tableData as any)[index] = response;
      }
    }
    newState.modal.open = false;
    setState(newState);
    toastHelper.success(`${entityName} ${isEdit ? 'Updated' : 'Added'}`);
  }

  async function handleReload() {
    const items = await reloadPromise();
    setState((ps) => ({ ...ps, tableData: items }));
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


  const header = state.modal.mode === 'edit' ? `Update ${props.entityName}` : `Add ${props.entityName}`;
  return (
    <React.Fragment>
      <DataTable<T>
        className={classes}
        toolbarProps={{
          onAdd: () => setState((ps) => ({ ...ps, modal: { ...ps.modal, open: true, data: undefined, mode: 'add' } })),
          onReload: handleReload
        }}
        columns={columns}
        data={state.tableData}
        actions={[
          DataTableActions.edit(handleEditClick),
        ]}
        dataIdProperty={dataIdProperty}
      />
      <ModalAutoForm
        header={header}
        submitButtonText={state.modal.mode === 'edit' ? 'Update' : 'Add'}
        open={state.modal.open}
        initialValues={state.modal.data}
        onClose={() => setState((ps) => ({ ...ps, modal: { ...ps.modal, open: !ps.modal.open } }))}
        onBack={() => setState((ps) => ({ ...ps, modal: { ...ps.modal, open: false } }))}
        onSubmitPromise={(values: T) => {
          const isEdit = state.modal.mode === 'edit';
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