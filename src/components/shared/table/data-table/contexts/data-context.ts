import React from 'react';

export interface DataTableDataContextProps<T> {
  data: T[]
  shownData: T[]
  dataTotal: number
  filteredDataTotal: number
}

const DataTableDataContext = React.createContext<DataTableDataContextProps<any>>({
  data: [],
  shownData: [],
  dataTotal: 0,
  filteredDataTotal: 0,
});

export default DataTableDataContext;