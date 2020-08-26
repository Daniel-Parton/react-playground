import React from 'react';

export interface DataTableFilterContextProps {
  filterValues?: any
  filterModalOpen: boolean
}

const DataTableFilterContext = React.createContext<DataTableFilterContextProps>({
  filterValues: {},
  filterModalOpen: false
});

export default DataTableFilterContext;