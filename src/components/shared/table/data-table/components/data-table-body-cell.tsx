import React, { useMemo } from 'react';
import classNames from 'classnames';
import { DataTableColumnDefinition } from '..';

interface DataTableBodyCellProps<T> {
  className?: string
  column: DataTableColumnDefinition<T>
  dataRow: T
}
function DataTableBodyCell<T>(props: DataTableBodyCellProps<T>) {
  const { className, column, dataRow, ...rest } = props;

  const classes = classNames({
    'data-table-body-cell': true,
    [className!]: className !== undefined
  });

  return useMemo(() => (
    <td className={classes} {...rest}>
      {column.renderCell && column.renderCell(dataRow, column.key)}
      {!column.renderCell && dataRow[column.key]}
    </td>
  ), [props, dataRow]);
}

export default DataTableBodyCell;