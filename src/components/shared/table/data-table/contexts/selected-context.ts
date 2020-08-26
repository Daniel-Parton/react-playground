import React from 'react';

export interface DataTableSelectedContextProps {
  selectedIds: any[]
  allSelected: boolean
}

const DataTableSelectedContext = React.createContext<DataTableSelectedContextProps>({
  selectedIds: [],
  allSelected: false
});

export default DataTableSelectedContext;