import { useContext } from 'react';
import DataTableDataContext, { DataTableDataContextProps } from './data-context';
import DataTableFilterContext, { DataTableFilterContextProps } from './filter-context';
import DataTableOrderByContext, { DataTableOrderByContextProps } from './order-by-context';
import DataTablePageContext, { DataTablePageContextProps } from './page-context';
import DataTableSearchContext, { DataTableSearchContextProps } from './search-context';
import DataTableSelectedContext, { DataTableSelectedContextProps } from './selected-context';
import DataTableSettersContext from './setters-context';

export interface DataTableGetterProps<T> extends DataTableDataContextProps<T>,
  DataTableFilterContextProps, DataTableOrderByContextProps<T>, DataTablePageContextProps, DataTableSearchContextProps,
  DataTableSelectedContextProps { }

//Purpose of this space is to split contexts up into logical chunks so consumers can specifically
//choose what data to use which will cause less rerenders on certain components
const useDataTableDataContext = () => useContext(DataTableDataContext);
const useDataTableFilterContext = () => useContext(DataTableFilterContext);
const useDataTableOrderByContext = () => useContext(DataTableOrderByContext);
const useDataTablePageContext = () => useContext(DataTablePageContext);
const useDataTableSearchContext = () => useContext(DataTableSearchContext);
const useDataTableSelectedContext = () => useContext(DataTableSelectedContext);
const useDataTableSettersContext = () => useContext(DataTableSettersContext);

export {
  DataTableDataContext,
  useDataTableDataContext,

  DataTableFilterContext,
  useDataTableFilterContext,

  DataTableOrderByContext,
  useDataTableOrderByContext,

  DataTablePageContext,
  useDataTablePageContext,

  DataTableSearchContext,
  useDataTableSearchContext,

  DataTableSelectedContext,
  useDataTableSelectedContext,

  DataTableSettersContext,
  useDataTableSettersContext
}