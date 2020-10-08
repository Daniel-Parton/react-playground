import React, { useState, useEffect } from 'react';
import isEqual from 'react-fast-compare';
import classNames from 'classnames';
import { Table } from 'reactstrap';
import DataTableHead from './components/data-table-head';
import DataTableBody from './components/data-table-body';
import DataTableFilterModal from './components/data-table-filter-modal';
import { DataTableGetterProps } from './contexts';
import DataTableContextWrapper from './contexts/data-table-context-wrapper'
import { DataTableAction } from '../data-table-actions';

import DataTableToolbar, { DataTableToolBarProps } from './components/data-table-toolbar';
import Pagination from '../../paging/pagination';
import * as FilterHelper from './helpers/data-table-filter-helper';
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

export interface DataTablePagingOptions {
  itemsPerPage: number
  onPageChange?: (page: number) => void
}

export interface DataTableProps<T> {
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
  pageOptions?: DataTablePagingOptions
}

function DataTable<T>(props: DataTableProps<T>) {
  const { className, columns, dataIdProperty, actionsFunc, actions, actionsHeader, toolbarProps, customToolbar,
    selectable, pageOptions, loading, small, blocking, blockingMessage } = props;

  const classes = classNames({
    'data-table-container': true,
    [className!]: className !== undefined
  });

  const [state, setState] = useState<DataTableGetterProps<T>>({
    filterValues: {},
    filterModalOpen: false,
    orderBy: undefined,
    orderByDirection: undefined,
    selectedIds: [],
    allSelected: false,
    activePage: 1,
    data: props.data,
    shownData: props.data,
    dataTotal: props.data.length,
    filteredDataTotal: props.data.length,
    searchText: ''
  });

  useEffect(() => {
    tryReRenderData(state.data);
  }, [state]);

  useEffect(() => {
    tryReRenderData(props.data);
  }, [props]);

  const tryReRenderData = (data: T[]) => {
    const filterOptions: FilterHelper.FilterDataOptions = {
      searchString: state.searchText,
      orderBy: state.orderBy,
      orderByDirection: state.orderByDirection,
      pageNumber: state.activePage,
      pageOptions: pageOptions,
      filters: state.filterValues
    };
    const filterResult = FilterHelper.filterData(data, columns, filterOptions);
    if (filterResult.filteredTotal !== state.filteredDataTotal || !isEqual(filterResult.shownData, state.shownData)) {
      setState((ps) => {
        const newState = { ...ps, data: data, shownData: filterResult.shownData, filteredDataTotal: filterResult.filteredTotal, allSelected: false, selectedIds: [] };
        if (pageOptions) {
          const minViewableItem = state.activePage <= 1 ? 1 : (state.activePage - 1) * pageOptions.itemsPerPage + 1;
          if (newState.filteredDataTotal < minViewableItem) {
            newState.activePage = 1;
          }
        }
        return newState;
      });
    }
  }

  const handleUpdateFilter = (key: keyof T, filter: any) => {
    setState((ps) => {
      const newState = { ...ps };
      if (!newState.filterValues) newState.filterValues = {};
      newState.filterValues[key] = filter
      return newState;
    });
  }

  const handleRemoveFilter = (key: keyof T) => {
    setState((ps) => {
      const newState = { ...ps };
      if (!newState.filterValues) {
        newState.filterValues = {};
        return newState;
      }
      if (newState.filterValues[key]) newState.filterValues[key] = undefined;
      return newState;
    });
  }

  const handleToggleSelected = (id: any) => {
    setState((ps) => {
      const newState = { ...ps };
      const index = newState.selectedIds.findIndex(e => e === id);
      if (index >= 0) {
        newState.selectedIds.splice(index, 1);
      } else {
        newState.selectedIds.push(id);
      }

      newState.allSelected = newState.selectedIds.length === state.shownData.length;
      return newState;
    });
  }

  const handleToggleSelectAll = (selected: boolean) => {
    setState((ps) => {
      const newState = { ...ps, allSelected: selected };
      newState.selectedIds = [];

      if (selected) state.shownData.forEach(e => newState.selectedIds.push(e[dataIdProperty]));
      return newState;
    });
  }

  const handleUpdateOrderBy = (ob?: any, obd?: OrderByDirection) => {
    setState((ps) => ({ ...ps, orderBy: ob as any, orderByDirection: obd }));
  };

  const getToolbarProps = () => {
    let compiledToolbarProps: DataTableToolBarProps = toolbarProps ? { ...toolbarProps } : {};

    //Override search in case onSearch prop provided
    const handleSearch = (searchText: string) => {
      setState((ps) => ({ ...ps, searchText: searchText }));
      if (onSearch) onSearch(searchText);
    }

    const { onSearch, ...rest } = compiledToolbarProps;


    compiledToolbarProps = { ...rest, loading: loading, onSearch: handleSearch };
    return compiledToolbarProps
  }

  return (
    <DataTableContextWrapper
      getters={state}
      setters={{
        updateFilter: handleUpdateFilter,
        removeFilter: handleRemoveFilter,
        resetFilters: (closeModal: boolean) => setState((ps) => ({ ...ps, filterValues: undefined, filterModalOpen: closeModal ? false : ps.filterModalOpen })),
        toggleSelectAll: handleToggleSelectAll,
        toggleSelected: handleToggleSelected,
        updateOrderBy: handleUpdateOrderBy,
        setFilterModalOpen: (open) => setState(ps => ({ ...ps, filterModalOpen: open }))
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
                  data={state.shownData}
                />
              </Table>
            )}
          </div>
          {pageOptions && (
            <Pagination
              leftContent={<span className='mr-3'>{PageHelper.getPageDescription(state.filteredDataTotal, state.activePage, pageOptions.itemsPerPage)} </span>}
              activePage={state.activePage}
              itemsCountPerPage={pageOptions.itemsPerPage}
              totalItemsCount={state.filteredDataTotal}
              onChange={(p) => setState((ps) => ({ ...ps, activePage: p }))}
            />
          )}
          <DataTableFilterModal columns={columns} />
        </div>
      </BlockUi>
    </DataTableContextWrapper>
  )
}

export default DataTable as <T>(props: DataTableProps<T>) => JSX.Element;