import React from 'react';
import classNames from 'classnames';
import { DataTableColumnDefinition } from '..';
import { DataTableAction } from '../../data-table-actions';
import DataTableBodyRow from './data-table-body-row';
import { useDataTableSelectedContext } from '../contexts';

interface DataTableBodyProps<T> {
  loading?: boolean
  className?: string
  actionsFunc?: (data: T) => DataTableAction<T>[]
  actions?: DataTableAction<T>[]
  columns: DataTableColumnDefinition<T>[]
  data: T[]
  dataIdProperty: keyof T
  selectable?: boolean
}

function DataTableBody<T>(props: DataTableBodyProps<T>) {
  const { className, columns, data, actions, dataIdProperty, selectable, loading, actionsFunc, ...rest } = props;

  const classes = classNames({
    'data-table-body': true,
    [className!]: className !== undefined
  });

  const { selectedIds } = useDataTableSelectedContext();

  return (
    <tbody className={classes} {...rest}>
      {!data.length && (
        <tr className='data-table-no-items-row'><td colSpan={9999}>{loading ? 'One moment please...' : 'No Results'}</td></tr>
      )}
      {data.map((dataRow: any) => {
        return (
          <DataTableBodyRow<T>
            selected={selectedIds.some(e => e === dataRow[dataIdProperty])}
            key={`data-table-row-${dataRow[dataIdProperty]}`}
            actionsFunc={actionsFunc}
            actions={actions}
            columns={columns}
            dataRow={dataRow}
            selectable={selectable}
            dataIdProperty={dataIdProperty}
          />
        );
      })}
    </tbody>
  )
}

export default DataTableBody;