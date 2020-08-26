import React from 'react';
import { OrderByDirection } from '../data-table-shared-types';

export interface DataTableSettersContextProps<T> {
  updateFilter: (key: keyof T, filter: any) => void
  removeFilter: (key: keyof T) => void
  resetFilters: (closeModal: boolean) => void
  updateOrderBy: (orderBy?: keyof T, orderByDirection?: OrderByDirection) => void
  toggleSelected: (id: any) => void
  toggleSelectAll: (selected: boolean) => void
  setFilterModalOpen: (open: boolean) => void

}

const DataTableSettersContext = React.createContext<DataTableSettersContextProps<any>>({
  updateFilter: (key, filter) => { },
  removeFilter: (key) => { },
  resetFilters: (closeModal) => { },
  updateOrderBy: (orderBy, orderByDirection) => { },
  toggleSelected: (id) => { },
  toggleSelectAll: () => { },
  setFilterModalOpen: (open) => { }
});

export default DataTableSettersContext;