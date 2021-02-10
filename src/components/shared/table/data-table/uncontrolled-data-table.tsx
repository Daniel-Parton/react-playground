import React, { useState, useEffect } from 'react';
import isEqual from 'react-fast-compare';
import { DataTableGetterProps } from './contexts';
import { DataTableAction } from '../data-table-actions';

import { DataTableToolBarProps } from './components/data-table-toolbar';
import * as FilterHelper from './helpers/data-table-filter-helper';
import { DataTableFilterDefinition } from './data-table-shared-types';
import BaseDataTable from './base-data-table';

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

export interface UncontrolledDataTableProps<T> {
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

function UncontrolledDataTable<T>(props: UncontrolledDataTableProps<T>) {
  const { className, columns, dataIdProperty, actionsFunc, actions, actionsHeader, toolbarProps, customToolbar,
    selectable, pageOptions, loading, small, blocking, blockingMessage } = props;

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

  const handleResetFilter = (closeModal: boolean) => {
    setState((ps) => ({
      ...ps,
      filterValues: undefined,
      filterModalOpen: closeModal ? false : ps.filterModalOpen
    }));
  };

  const compiledToolbarProps = !toolbarProps ? undefined : { ...toolbarProps };
  if (compiledToolbarProps) {
    const originalOnSearch = compiledToolbarProps.onSearch;
    compiledToolbarProps.onSearch = (searchText) => {
      setState((ps) => ({ ...ps, searchText: searchText }));
      if (originalOnSearch) originalOnSearch(searchText);
    }
  }

  return (
    <BaseDataTable<T>
      {...state}
      small={small}
      blocking={blocking}
      blockingMessage={blockingMessage}
      loading={loading}
      className={className}
      columns={columns}
      dataIdProperty={dataIdProperty}
      data={state.shownData}
      actionsHeader={actionsHeader}
      actionsFunc={actionsFunc}
      actions={actions}
      toolbarProps={compiledToolbarProps}
      customToolbar={customToolbar}
      selectable={selectable}
      pageOptions={!pageOptions ? undefined : {
        itemsPerPage: pageOptions.itemsPerPage,
        onPageChange: (p) => {
          setState((ps) => ({ ...ps, activePage: p }));
          if (pageOptions.onPageChange) pageOptions.onPageChange(p);
        },
        activePage: state.activePage,
        filteredDataTotal: state.filteredDataTotal
      }}
      onResetFilter={handleResetFilter}
      onFilterUpdate={handleUpdateFilter}
      onFilterRemove={handleRemoveFilter}
      onToggleSelected={handleToggleSelected}
      onToggleSelectAll={handleToggleSelectAll}
      onOrderBy={(ob, d) => setState((ps) => ({ ...ps, orderBy: ob as any, orderByDirection: d }))}
      onFilterModalOpen={(open) => setState(ps => ({ ...ps, filterModalOpen: open }))}
    />
  )
}

export default UncontrolledDataTable as <T>(props: UncontrolledDataTableProps<T>) => JSX.Element;