import React from 'react';
import classNames from 'classnames';
import { Table } from 'reactstrap';
import DataTableHead from './components/data-table-head';
import DataTableBody from './components/data-table-body';
import DataTableFilterModal from './components/data-table-filter-modal';
import DataTableContextWrapper from './contexts/data-table-context-wrapper'
import { DataTableAction } from '../data-table-actions';


import { DataTableGetterProps } from './contexts';
import DataTableToolbar, { DataTableToolBarProps } from './components/data-table-toolbar';
import Pagination from '../../paging/pagination';
import * as PageHelper from './helpers/data-table-page-helper';
import TableSkeleton from '../../loading-skeleton/table-skeleton';
import { OrderByDirection, DataTableFilterDefinition } from './data-table-shared-types';
import BlockUi from '../../block-ui';

export interface DataTableColumnDefinition<T> {
  key: keyof T
  header?: string //String of what the header cell will show
  renderHeader?: () => any //Custom renderer for header cell
  renderCell?: (dataRow: T, rowCellKey: keyof T) => any //Custom renderer for body cell
  hide?: boolean //Hide column entirely
  noOrderBy?: boolean //Dont allow column to be ordereable
  searchable?: boolean //Allow column to be globally searched
  compareValue?: (item: T) => any //Value to be used in the filter, search or order by if different to the standard value
  filters?: DataTableFilterDefinition[] //Array of Filter definitions to allow column to be filtered
}

export interface BaseDataTablePagingOptions {
  itemsPerPage: number
  activePage: number
  filteredDataTotal: number
  onPageChange: (page: number) => void
}

export interface BaseDataTableProps<T> extends DataTableGetterProps<T> {
  small?: boolean
  blocking?: boolean
  blockingMessage?: string
  loading?: boolean
  className?: string
  columns: DataTableColumnDefinition<T>[]
  dataIdProperty: keyof T
  data: T[]
  actionsHeader?: string
  actionsFunc?: (data: T) => DataTableAction<T>[]
  actions?: DataTableAction<T>[]
  toolbarProps?: DataTableToolBarProps
  customToolbar?: any
  selectable?: boolean
  pageOptions?: BaseDataTablePagingOptions
  onResetFilter?: (closeModal: boolean) => void
  onFilterUpdate?: (key: keyof T, filter: any) => void
  onFilterRemove?: (key: keyof T) => void
  onToggleSelected?: (key: keyof T) => void
  onToggleSelectAll?: (selected: boolean) => void
  onOrderBy?: (order?: any, direction?: OrderByDirection) => void
  onFilterModalOpen?: (open: boolean) => void
}

function BaseDataTable<T>(props: BaseDataTableProps<T>) {
  const
    {
      className, columns, dataIdProperty, actionsFunc, actions,
      actionsHeader, toolbarProps, customToolbar, selectable,
      pageOptions, loading, small, blocking, blockingMessage,
      data, onFilterUpdate, onFilterRemove, onToggleSelected,
      onToggleSelectAll, onOrderBy, onResetFilter, onFilterModalOpen
    } = props;

  const classes = classNames({
    'data-table-container': true,
    [className!]: className !== undefined
  });

  const getToolbarProps = () => {
    let compiledToolbarProps: DataTableToolBarProps = toolbarProps ? { ...toolbarProps } : {};
    const handleSearch = (searchText: string) => {
      if (onSearch) onSearch(searchText);
    }
    const { onSearch, ...rest } = compiledToolbarProps;
    compiledToolbarProps = { ...rest, loading: loading, onSearch: handleSearch };
    return compiledToolbarProps
  }

  return (
    <DataTableContextWrapper
      getters={props}
      setters={{
        updateFilter: (key, filter) => { if (onFilterUpdate) onFilterUpdate(key, filter); },
        removeFilter: (key) => { if (onFilterRemove) onFilterRemove(key); },
        resetFilters: (closeModal: boolean) => { if (onResetFilter) onResetFilter(closeModal); },
        toggleSelectAll: (selected) => { if (onToggleSelectAll) onToggleSelectAll(selected); },
        toggleSelected: (id) => { if (onToggleSelected) onToggleSelected(id); },
        updateOrderBy: (orderBy, direction) => { if (onOrderBy) onOrderBy(orderBy, direction); },
        setFilterModalOpen: (open) => { if (onFilterModalOpen) onFilterModalOpen(open); }
      }}
    >
      <BlockUi blocking={blocking} text={blockingMessage}>
        <div className={classes}>
          <DataTableToolbar {...getToolbarProps()} />
          {customToolbar}
          <div className='data-table-wrapper'>
            {loading && <TableSkeleton columnCount={columns.length} />}
            {!loading && (
              <Table className='data-table' responsive size={small ? 'sm' : undefined}>
                <DataTableHead
                  selectable={selectable}
                  actionsHeader={actionsHeader}
                  /* eslint-disable */
                  hasActions={(actionsFunc || actions && actions.length) ? true : false}
                  columns={columns}
                />
                <DataTableBody
                  loading={loading}
                  selectable={selectable}
                  actionsFunc={actionsFunc}
                  actions={actions}
                  columns={columns}
                  dataIdProperty={dataIdProperty}
                  data={data}
                />
              </Table>
            )}
          </div>
          {pageOptions && (
            <Pagination
              leftContent={<span className='mr-3'>{PageHelper.getPageDescription(pageOptions.filteredDataTotal, pageOptions.activePage, pageOptions.itemsPerPage)} </span>}
              activePage={pageOptions.activePage}
              itemsCountPerPage={pageOptions.itemsPerPage}
              totalItemsCount={pageOptions.filteredDataTotal}
              onChange={pageOptions.onPageChange}
            />
          )}
          <DataTableFilterModal columns={columns} />
        </div>
      </BlockUi>
    </DataTableContextWrapper>
  )
}

export default BaseDataTable as <T>(props: BaseDataTableProps<T>) => JSX.Element;