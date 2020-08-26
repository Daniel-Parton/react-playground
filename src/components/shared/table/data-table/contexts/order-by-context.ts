import React from 'react';
import { OrderByDirection } from '../data-table-shared-types';

export interface DataTableOrderByContextProps<T> {
  orderBy?: keyof T
  orderByDirection?: OrderByDirection
}

const DataTableOrderByContext = React.createContext<DataTableOrderByContextProps<any>>({
  orderBy: undefined,
  orderByDirection: 'asc'
});

export default DataTableOrderByContext;