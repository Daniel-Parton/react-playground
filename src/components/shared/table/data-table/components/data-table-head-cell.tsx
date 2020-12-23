import React from 'react';
import classNames from 'classnames';
import { FaChevronUp, FaFilter } from 'react-icons/fa';

import { DataTableColumnDefinition } from '../uncontrolled-data-table';
import { Button } from '../../..';
import { isEmpty } from '../../../../../helpers/object-helper';

import DataTableRowFilter from './data-table-row-filter';
import { useDataTableOrderByContext, useDataTableSettersContext, useDataTableFilterContext } from '../contexts';
import { OrderByDirection } from '../data-table-shared-types';

interface DataTableHeadCellProps<T> {
  className?: string
  column: DataTableColumnDefinition<T>
}

function DataTableHeadCell<T>(props: DataTableHeadCellProps<T>) {
  const { className, column, ...rest } = props;

  const { orderBy, orderByDirection } = useDataTableOrderByContext();
  const { updateOrderBy } = useDataTableSettersContext();
  const { filterValues } = useDataTableFilterContext();

  const classes = classNames({
    'data-table-head-cell': true,
    [className!]: className !== undefined
  });

  const isOrderedBy = orderBy === column.key;

  const handleSortClick = () => {
    if (column.noOrderBy) return;
    let newDirection: OrderByDirection = 'asc';
    if (orderBy === column.key && orderByDirection === 'asc') newDirection = 'desc';
    updateOrderBy(column.key, newDirection);
  }

  const sortIconClasses = classNames({
    'data-table-head-cell-icon': true,
    'active': isOrderedBy,
    'rotate-180': isOrderedBy && orderByDirection === 'desc'
  });

  const hasFilter = column.filters && column.filters.length ? true : false;
  let compiledFilterValues = !filterValues ? undefined : filterValues[column.key];
  if (compiledFilterValues && isEmpty(filterValues[column.key])) compiledFilterValues = undefined;

  const filterIconClasses = classNames({
    'data-table-head-cell-icon': true,
    'filter-button': true,
    'active': compiledFilterValues,
    'hidden': !hasFilter
  });

  const filterId = `data-table-${column.key}-filter`;

  return (
    <th className={classes} {...rest}>
      <div className='d-flex align-items-center'>
        <div>
          {column.renderHeader && column.renderHeader()}
          {!column.renderHeader && column.header && column.header}
          {!column.renderHeader && !column.header && column.key}
        </div>
        <Button variant='transparent' className={sortIconClasses} icon={FaChevronUp} onClick={handleSortClick} />
        <Button id={filterId} variant='transparent' className={filterIconClasses} icon={FaFilter} />
        {hasFilter && <DataTableRowFilter filterValues={compiledFilterValues} columnKey={column.key} filters={column.filters!} buttonId={filterId} />}
      </div>
    </th>
  );
}

export default DataTableHeadCell;