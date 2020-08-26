import React from 'react';
import {
  DataTableGetterProps,
  DataTableDataContext,
  DataTableFilterContext,
  DataTableOrderByContext,
  DataTablePageContext,
  DataTableSearchContext,
  DataTableSelectedContext,
  DataTableSettersContext
} from '.'
import { DataTableSettersContextProps } from './setters-context';

export interface DataTableContextWrapperProps<T> {
  getters: DataTableGetterProps<T>
  setters: DataTableSettersContextProps<T>
  children: any
}

function DataTableContextWrapper<T>(props: DataTableContextWrapperProps<T>) {

  const { getters, setters, children } = props;

  return (
    <DataTableDataContext.Provider
      value={{
        data: getters.data,
        shownData: getters.shownData,
        dataTotal: getters.dataTotal,
        filteredDataTotal: getters.filteredDataTotal,
      }}
    >
      <DataTableFilterContext.Provider
        value={{
          filterValues: getters.filterValues,
          filterModalOpen: getters.filterModalOpen
        }}
      >
        <DataTableOrderByContext.Provider
          value={{
            orderBy: getters.orderBy,
            orderByDirection: getters.orderByDirection
          }}
        >
          <DataTablePageContext.Provider
            value={{
              activePage: getters.activePage
            }}
          >
            <DataTableSearchContext.Provider
              value={{
                searchText: getters.searchText
              }}
            >
              <DataTableSelectedContext.Provider
                value={{
                  allSelected: getters.allSelected,
                  selectedIds: getters.selectedIds
                }}
              >
                <DataTableSettersContext.Provider
                  value={setters}
                >
                  {children}
                </DataTableSettersContext.Provider>
              </DataTableSelectedContext.Provider>

            </DataTableSearchContext.Provider>

          </DataTablePageContext.Provider>

        </DataTableOrderByContext.Provider>


      </DataTableFilterContext.Provider>
    </DataTableDataContext.Provider>
  )
}

export default DataTableContextWrapper as <T>(props: DataTableContextWrapperProps<T>) => JSX.Element;