import React from 'react';
import { useDataTableSettersContext, useDataTableFilterContext } from '../contexts';
import { DataTableColumnDefinition } from '..';
import ModalSimple from '../../../modal/modal-simple';
import AutoForm from '../../../form/auto-form/auto-form';
import * as FilterHelper from '../helpers/data-table-filter-helper';
import { addSpacesOnCaps } from '../../../../../helpers/string-helper';
import { AutoFormRow } from '../../../form/auto-form/auto-form-types';
import { ChipProps } from '../../../chips/chip';

export interface DataTableFilterModal<T> {
  columns: DataTableColumnDefinition<T>[]
}

function DataTableFilterModal<T>(props: DataTableFilterModal<T>) {
  const { columns } = props;

  const { filterValues, filterModalOpen } = useDataTableFilterContext();
  const { resetFilters, setFilterModalOpen, updateFilter, removeFilter } = useDataTableSettersContext();

  const handleRemoveColumnFilter = (columnKey: string, filterKey: string) => {
    const newColumnFilter = { ...filterValues[columnKey] };
    newColumnFilter[filterKey] = undefined;
    updateFilter(columnKey, newColumnFilter);
  }

  //This shouldnt happen but best to double check
  if (!FilterHelper.tableHasFilterValues(filterValues)) return null;

  //Build out rows
  const rows: AutoFormRow[] = [];

  //Filter values will be an object where the key is the columnKey and value is the filter value object
  Object.keys(filterValues).forEach(key => {
    const columnFilter = filterValues[key];
    if (FilterHelper.columnHasFilterValues(columnFilter)) {
      const column = columns.find(c => c.key === key);
      const filterOptionValues: ChipProps[] = [];
      if (column) {
        Object.keys(columnFilter).forEach(cKey => {
          if (columnFilter[cKey]) filterOptionValues.push({ label: `${addSpacesOnCaps(cKey)}: ${columnFilter[cKey]}`, onDelete: () => handleRemoveColumnFilter(key, cKey) });
        });
        if (filterOptionValues.length) {
          if (filterOptionValues.length > 1) filterOptionValues.push({ label: 'Clear All', onDelete: () => removeFilter(key) })
          rows.push({ columns: [{ field: { name: key, display: addSpacesOnCaps(column.header ?? key), type: 'TagDisplay', options: { tagOptions: filterOptionValues } } }] });
        }
      }
    }
  });

  return (
    <ModalSimple
      header='Active Filters'
      open={filterModalOpen}
      onClose={() => setFilterModalOpen(false)}
    >
      <AutoForm
        rows={rows}
        onSubmitPromise={p => Promise.resolve(p)}
        submitButtonText='Clear Filters'
        onSubmitSuccess={() => resetFilters(true)}
        hideBack
      />
    </ModalSimple>
  );
}

export default DataTableFilterModal;