import React from 'react';

export interface DataTablePageContextProps {
  activePage: number
}

const DataTablePageContext = React.createContext<DataTablePageContextProps>({
  activePage: 1
});

export default DataTablePageContext;