import { every } from 'lodash';
import { DataTablePagingOptions, DataTableColumnDefinition } from '../uncontrolled-data-table';
import * as ObjectHelper from '../../../../../helpers/object-helper';
import * as DateHelper from '../../../../../helpers/date-helper';
import { DataTableFilterValues } from '../components/data-table-row-filter';
import { OrderByDirection } from '../data-table-shared-types';
import moment from 'moment';

export interface FilterDataOptions {
  searchString?: string
  orderBy?: any
  orderByDirection?: any
  pageNumber?: number
  pageOptions?: DataTablePagingOptions
  filters?: any
}

export interface FilterDataResult {
  shownData: any[]
  filteredTotal: number
}

export const columnHasFilterValues = (columnFilterValues?: any) => {
  return !ObjectHelper.isEmpty(columnFilterValues);
}

export const tableHasFilterValues = (filterValues?: any) => {
  if (!filterValues) return false;
  return Object.keys(filterValues).some(key => !ObjectHelper.isEmpty(filterValues[key]));
}

export const filterData = (data: any[], columns: DataTableColumnDefinition<any>[], options?: FilterDataOptions) => {
  let result: FilterDataResult = {
    shownData: [...data],
    filteredTotal: data.length
  };

  result = filterForSearch(result, columns, options?.searchString);
  result = filterForColumnFilters(result, columns, options?.filters);
  result.filteredTotal = result.shownData.length;
  result = applyOrderBy(result, columns, options?.orderBy, options?.orderByDirection);
  result = applyPaging(result, data.length, options?.pageNumber, options?.pageOptions);

  return result;
}

//Search Bar Handling
const filterForSearch = (result: FilterDataResult, columns: DataTableColumnDefinition<any>[], searchString?: string) => {
  if (!searchString) return result;

  const searchableColumns = columns.filter(e => e.searchable);
  if (!searchableColumns.length) return result;

  result.shownData = result.shownData.filter(cd => {
    return searchableColumns.some(a => {
      const columnValue = a.compareValue ? a.compareValue(cd) : cd[a.key];
      return applySearchOnColumnValue(columnValue, searchString!);
    });
  });

  return result;
}

type StringSearchType = 'Contains' | 'StartsWith' | 'EndsWith' | 'Equals';
const applySearchOnColumnValue = (columnValue: any, searchText: string, type: StringSearchType = 'Contains') => {
  if (columnValue === null || columnValue === undefined) return false;

  if (ObjectHelper.isArray(columnValue)) {
    const result = (columnValue as any[]).some(e => applySearchOnColumnValue(e, searchText));
    return result;
  }

  if (ObjectHelper.isBoolean(columnValue) || ObjectHelper.isNumber(columnValue)) columnValue = columnValue.toString();
  if (ObjectHelper.isString(columnValue)) {
    switch (type) {
      case 'Contains': return (columnValue as string).toLowerCase().includes(searchText.toLowerCase());
      case 'StartsWith': return (columnValue as string).toLowerCase().startsWith(searchText.toLowerCase());
      case 'EndsWith': return (columnValue as string).toLowerCase().endsWith(searchText.toLowerCase());
      case 'Equals': return (columnValue as string).toLowerCase() === searchText.toLowerCase();
    }
  }
  return false;
}

type DateFilterType = 'Min' | 'Max';
const applyDateFilter = (columnValue: any, filterValue: string, type: DateFilterType) => {
  if (columnValue === null || columnValue === undefined) return false;

  const valueMoment = moment(columnValue, DateHelper.dateFormat, true);
  const filterMoment = moment(filterValue, DateHelper.dateFormat, true);
  if (!valueMoment.isValid() || !filterMoment.isValid()) return true;

  switch (type) {
    case 'Min': return valueMoment.isSameOrAfter(filterMoment);
    case 'Max': return valueMoment.isSameOrBefore(filterMoment);
  }
}

type NumberFilterType = 'Min' | 'Max' | 'Equals';
const applyNumberFilter = (columnValue: any, filterValue: number, type: NumberFilterType) => {
  if (columnValue === null || columnValue === undefined) return false;
  if (!ObjectHelper.isNumber(columnValue) || !ObjectHelper.isNumber(filterValue)) return false;
  switch (type) {
    case 'Min': return columnValue >= filterValue;
    case 'Max': return columnValue <= filterValue;
    case 'Equals': return columnValue === filterValue;
  }
}

//columnFilters should be an object of { [keyOf column]: value: DataTableFilterValues }
const filterForColumnFilters = (result: FilterDataResult, columns: DataTableColumnDefinition<any>[], columnFilters?: any) => {
  if (!columnFilters) return result;

  //Get columns that have filter values
  const columnFilterKeys = Object.keys(columnFilters).filter(key => columnFilters[key]);
  const filterableColumns = columns.filter(e => columnFilterKeys.some(k => k === e.key));

  result.shownData = result.shownData.filter(cd => {
    return every(filterableColumns, c => {
      const columnValue = c.compareValue ? c.compareValue(cd) : cd[c.key];
      const filter = columnFilters[c.key] as DataTableFilterValues;
      let passesFilter = true;

      //String Filters
      if (filter.stringContains) passesFilter = applySearchOnColumnValue(columnValue, filter.stringContains, 'Contains');
      if (passesFilter && filter.stringStartsWith) passesFilter = applySearchOnColumnValue(columnValue, filter.stringStartsWith, 'StartsWith');
      if (passesFilter && filter.stringEndsWith) passesFilter = applySearchOnColumnValue(columnValue, filter.stringEndsWith, 'EndsWith');
      if (passesFilter && filter.stringEquals) passesFilter = applySearchOnColumnValue(columnValue, filter.stringEquals, 'Equals');

      //Date Filters
      if (passesFilter && filter.minDate) passesFilter = applyDateFilter(columnValue, filter.minDate, 'Min');
      if (passesFilter && filter.maxDate) passesFilter = applyDateFilter(columnValue, filter.maxDate, 'Max');

      //Number Filters
      if (passesFilter && (filter.minNumber !== null && filter.minNumber !== undefined)) passesFilter = applyNumberFilter(columnValue, filter.minNumber, 'Min');
      if (passesFilter && (filter.maxNumber !== null && filter.maxNumber !== undefined)) passesFilter = applyNumberFilter(columnValue, filter.maxNumber, 'Max');
      if (passesFilter && (filter.numberEquals !== null && filter.numberEquals !== undefined)) passesFilter = applyNumberFilter(columnValue, filter.numberEquals, 'Equals');

      return passesFilter;
    });
  });

  return result;
}

//TODO handle different datatype sorting
const applyOrderBy = (result: FilterDataResult, columns: DataTableColumnDefinition<any>[], orderBy?: string, direction?: OrderByDirection) => {
  if (!orderBy || !direction) return result;
  const column = columns.find(e => e.key === orderBy);
  if (!column) return result;

  result.shownData = result.shownData.sort((a: any, b: any) => {
    let first = column.compareValue ? column.compareValue(a) : (a[orderBy] as string);
    let second = column.compareValue ? column.compareValue(b) : (b[orderBy] as string);

    //Check for Dates
    if (DateHelper.isValidMoment(first) && DateHelper.isValidMoment(second)) {
      const firstMoment = moment(first);
      const secondMoment = moment(second);
      if (firstMoment.isSame(secondMoment)) return 0;
      if (direction === 'asc') return firstMoment.isBefore(secondMoment) ? -1 : 1;
      return firstMoment.isBefore(secondMoment) ? 1 : 1;
    }

    if (ObjectHelper.isString(first)) {
      first = first.toLowerCase();
      second = second.toLowerCase();
    }

    if (first === second) return 0;
    if (direction === 'asc') return first < second ? -1 : 1;
    return first < second ? 1 : -1;
  });

  return result;
}

const applyPaging = (result: FilterDataResult, resultTotal: number, pageNumber?: number, pageOptions?: DataTablePagingOptions) => {
  if (!pageNumber || !pageOptions) return result;
  const skip = pageNumber <= 1 ? 0 : (pageNumber - 1) * pageOptions.itemsPerPage;
  let end = skip + pageOptions.itemsPerPage;
  if (end > resultTotal) end = resultTotal;
  result.shownData = result.shownData.slice(skip, end);
  return result;
}

