import React, { memo } from 'react';
import classNames from 'classnames';
import { DataTableColumnDefinition } from '../uncontrolled-data-table';
import DataTableHeadCell from './data-table-head-cell';
import FormCheckBox from '../../../form/form-check-box';
import { useDataTableSelectedContext, useDataTableSettersContext } from '../contexts';

interface DataTableHeadProps<T> {
  className?: string
  columns: DataTableColumnDefinition<T>[]
  hasActions?: boolean
  actionsHeader?: any
  selectable?: boolean
}
function DataTableHead<T>(props: DataTableHeadProps<T>) {
  const { className, columns, hasActions, actionsHeader, selectable, ...rest } = props;

  const { allSelected } = useDataTableSelectedContext();
  const { toggleSelectAll } = useDataTableSettersContext();

  const classes = classNames({
    'data-table-head': true,
    [className!]: className !== undefined
  });

  const columnsToRender = columns.filter(e => !e.hide);

  return (
    <thead className={classes} {...rest}>
      <tr>
        {selectable && (
          <th><FormCheckBox className='mb-0 mt-0 mr-4' name='data-table-select-all' checked={allSelected} onChange={() => toggleSelectAll(!allSelected)} /></th>
        )}
        {columnsToRender.map(c => (
          <DataTableHeadCell<T>
            key={`data-table-header-${c.key}`}
            column={c}
          />
        ))}
        {hasActions && <th>{actionsHeader}</th>}
      </tr>
    </thead>
  );
}

export default memo(DataTableHead) as <T>(props: DataTableHeadProps<T>) => JSX.Element;