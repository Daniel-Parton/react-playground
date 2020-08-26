import React from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import FontAwesomeIconWithTheme from '../../../icon/font-awesome-icon-with-theme';
import * as DisplayHelper from '../../../../../helpers/display-helper';
import * as ObjectHelper from '../../../../../helpers/object-helper';

function date<T>(type: DisplayHelper.DateTimeDisplayType = 'date') {
  return (dataRow: T, rowCellKey: keyof T) => {
    const value = dataRow[rowCellKey];
    return !value ? value : DisplayHelper.date(value, type);
  }
};

function number<T>(maxDecimals: number = 2) {
  return (dataRow: T, rowCellKey: keyof T) => {
    const value = dataRow[rowCellKey];
    return !ObjectHelper.isNumber(value) ? value : DisplayHelper.number(value, maxDecimals);
  }
};

function money<T>() {
  return (dataRow: T, rowCellKey: keyof T) => {
    const value = dataRow[rowCellKey];
    return !ObjectHelper.isNumber(value) ? value : DisplayHelper.number(value);
  }
};

const booleanByValue = (value: any, allowNullOrUndefined?: boolean) => {
  if (allowNullOrUndefined && value !== false && value !== true) return undefined;
  return !value ?
    <FontAwesomeIconWithTheme icon={faTimes} color='danger' /> :
    <FontAwesomeIconWithTheme icon={faCheck} color='success' />;
};

function boolean<T>() {
  return (dataRow: T, rowCellKey: keyof T, allowNullOrUndefined?: boolean) => {
    const value = dataRow[rowCellKey] as any;
    return booleanByValue(value, allowNullOrUndefined);
  };
}



const renderers = {
  date,
  number,
  money,
  boolean,
  booleanByValue
}

export default renderers;