import React, { useMemo } from 'react';
import classNames from 'classnames';
import { DataTableColumnDefinition } from '../uncontrolled-data-table';
import { DataTableAction } from '../../data-table-actions';
import DataTableBodyCell from './data-table-body-cell';
import { ButtonConfirm, Button } from '../../../index';
import { ButtonProps } from '../../../buttons/button';
import FormCheckBox from '../../../form/form-check-box';
import { useDataTableSettersContext } from '../contexts';

interface DataTableBodyProps<T> {
  className?: string
  actionsFunc?: (data: T) => DataTableAction<T>[]
  actions?: DataTableAction<T>[]
  columns: DataTableColumnDefinition<T>[]
  dataRow: T
  dataIdProperty: keyof T
  selectable?: boolean
  selected?: boolean
  key?: any
}
function DataTableBodyRow<T>(props: DataTableBodyProps<T>) {
  const { className, columns, dataRow, actionsFunc, actions, dataIdProperty, selected, selectable } = props;

  const classes = classNames({
    [className!]: className !== undefined
  });

  const { toggleSelected } = useDataTableSettersContext();


  let columnsToRender = columns.filter(e => !e.hide);

  /* eslint-disable */
  const hasActions = (actionsFunc || actions && actions.length) ? true : false;

  const renderAction = (action: DataTableAction<any>, key?: any) => {

    const onClick = () => action.onClick(dataRow);
    const shared: ButtonProps = {
      className: 'data-table-action',
      key: key,
      small: true,
      icon: (action.iconFunc && action.iconFunc(dataRow)) || action.icon,
      variant: action.variant,
      toolTip: action.tooltipFunc ? action.tooltipFunc(dataRow) : action.tooltip,
      text: action.text,
      disabled: action.disabled
    };

    if (!action.options?.isConfirm) {
      return <Button {...shared} onClick={onClick} />
    }

    return (
      <ButtonConfirm
        {...shared}
        onConfirm={onClick}
        modalBody={action.options.modalBody}
        modalBodyText={action.options.modalBodyText}
        modalHeader={action.options.modalHeader}
        modalNoText={action.options.modalNoText}
        modalYesText={action.options.modalYesText}
      />
    );
  }

  return useMemo(() => (
    <tr className={classes} key={`data-table-row-${dataRow[dataIdProperty]}`}>
      {selectable && (
        <td>
          <FormCheckBox
            className='mb-0 mt-0 mr-4'
            name='data-table-select'
            checked={selected}
            onChange={() => toggleSelected(dataRow[dataIdProperty])}
          />
        </td>
      )}
      {columnsToRender.map((column) => (
        <DataTableBodyCell
          key={`data-table-cell-${dataRow[dataIdProperty]}-${column.key}`}
          column={column}
          dataRow={dataRow}
        />
      ))}
      {hasActions && (
        <td className='data-table-cell'>
          <div className='data-table-actions'>
            {actionsFunc && actionsFunc(dataRow).map(renderAction)}
            {!actionsFunc && actions!.map(renderAction)}
          </div>
        </td>
      )}
    </tr>
  ), [props, dataRow]);
}

export default DataTableBodyRow as <T>(props: DataTableBodyProps<T>) => JSX.Element;