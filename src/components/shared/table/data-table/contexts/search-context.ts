import React from 'react';

export interface DataTableSearchContextProps {
  searchText: string
}

const DataTableSearchContext = React.createContext<DataTableSearchContextProps>({
  searchText: '',
});

export default DataTableSearchContext;