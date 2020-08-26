import React, { useState } from 'react';
import classNames from 'classnames';
import { Popover, PopoverBody } from 'reactstrap';

import { AutoForm } from '../../..';
import { toStackedForm } from '../../../form/auto-form/auto-form-helper';
import { DataTableFilterDefinition } from '../data-table-shared-types';
import { useDataTableSettersContext } from '../contexts';
import { ButtonProps } from '../../../buttons/button';
import * as FilterHelper from '../helpers/data-table-filter-helper';
import { AutoFormPropertyDefinition } from '../../../form/auto-form/auto-form-types';
import { OptionModel } from '../../../../../types/shared-types';
import { date, dateLessThanOrEqualField, dateGreaterThanOrEqualField } from '../../../form/validators';

export interface DataTableFilterValues {
  stringStartsWith?: string
  stringEndsWith?: string
  stringContains?: string
  stringEquals?: string
  minDate?: string
  maxDate?: string
  options?: any[]
}

export interface DataTableRowFilterProps<T> {
  columnKey: keyof T
  className?: string
  buttonId: string
  filters: DataTableFilterDefinition[]
  filterValues?: any
}

function DataTableRowFilter<T>(props: DataTableRowFilterProps<T>) {
  const { className, buttonId, filters, columnKey, filterValues } = props;

  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const { updateFilter, removeFilter } = useDataTableSettersContext();
  const classes = classNames({
    'data-table-row-filter': true,
    [className!]: className !== undefined
  });

  const addStringStartsWith = (fields: AutoFormPropertyDefinition<DataTableFilterValues>[]) => fields.push({ name: 'stringStartsWith', type: 'TextInput', options: { placeholder: 'Starts With' } });
  const addStringEndsWith = (fields: AutoFormPropertyDefinition<DataTableFilterValues>[]) => fields.push({ name: 'stringEndsWith', type: 'TextInput', options: { placeholder: 'Ends With' } });
  const addStringContains = (fields: AutoFormPropertyDefinition<DataTableFilterValues>[]) => fields.push({ name: 'stringContains', type: 'TextInput', options: { placeholder: 'Contains' } });
  const addStringEquals = (fields: AutoFormPropertyDefinition<DataTableFilterValues>[]) => fields.push({ name: 'stringEquals', type: 'TextInput', options: { placeholder: 'Equals' } });
  const addOptions = (fields: AutoFormPropertyDefinition<DataTableFilterValues>[], options: OptionModel<any>[]) => fields.push({ name: 'options', type: 'MultiSelect', display: 'Equals', options: { options: options } });
  const addDateRange = (fields: AutoFormPropertyDefinition<DataTableFilterValues>[]) => {
    fields.push({ name: 'minDate', display: 'Min Date', type: 'DateInput', options: { validators: [date(), dateLessThanOrEqualField<DataTableFilterValues>('maxDate')] } });
    fields.push({ name: 'maxDate', display: 'Max Date', type: 'DateInput', options: { validators: [date(), dateGreaterThanOrEqualField<DataTableFilterValues>('minDate')] } });
  };
  const addStringAll = (fields: AutoFormPropertyDefinition<DataTableFilterValues>[]) => {
    addStringStartsWith(fields);
    addStringEndsWith(fields);
    addStringContains(fields);
    addStringEquals(fields);
  };

  const fields: AutoFormPropertyDefinition<DataTableFilterValues>[] = [];
  filters.forEach(filter => {
    switch (filter.type) {
      case 'StringContains': addStringContains(fields); break;
      case 'StringStartsWith': addStringStartsWith(fields); break;
      case 'StringEndsWWith': addStringEndsWith(fields); break;
      case 'StringEquals': addStringEquals(fields); break;
      case 'StringAll': addStringAll(fields); break;
      case 'Options': addOptions(fields, filter.options?.options ?? []); break;
      case 'DateRange': addDateRange(fields); break;
    }
  });

  const handleSubmitSuccess = (filterValues: any) => {
    setPopoverOpen(false);
    updateFilter(columnKey, filterValues);
  }

  const renderFormButtons = () => {
    const buttons: ButtonProps[] = [];
    if (!FilterHelper.columnHasFilterValues(filterValues)) return buttons;
    buttons.push({
      text: 'Clear',
      className: 'w-100',
      onClick: () => {
        setPopoverOpen(false);
        removeFilter(columnKey);
      }
    });
    return buttons;
  };

  return (
    <Popover
      trigger='legacy'
      placement='auto'
      toggle={() => setPopoverOpen(ps => !ps)}
      hideArrow
      className={classes}
      target={buttonId}
      isOpen={popoverOpen}
    >
      <PopoverBody>
        <AutoForm
          initialValues={filterValues}
          submitButtonText='Apply Filter'
          onSubmitPromise={(r) => Promise.resolve(r)}
          onSubmitSuccess={handleSubmitSuccess}
          rows={toStackedForm(fields)}
          hideBack
          additionalButtonsFunc={renderFormButtons}
        />
      </PopoverBody>
    </Popover>
  );
}

export default DataTableRowFilter;