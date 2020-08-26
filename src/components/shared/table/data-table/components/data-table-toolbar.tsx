import React, { useState } from 'react';
import classNames from 'classnames';
import { IconDefinition, faSync, faPlus, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Button, FormInput, ButtonConfirm } from '../../..';
import { ButtonProps } from '../../../buttons/button';
import { ButtonVariant } from '../../../buttons/shared';
import { useDataTableSelectedContext, useDataTableFilterContext, useDataTableSettersContext } from '../contexts';
import * as FilterHelper from '../helpers/data-table-filter-helper';
import { DataTableButtonOptions } from '../data-table-shared-types';

export interface DataTableToolBarButton {
  className?: string
  key: string
  icon: IconDefinition
  toolTip?: string
  variant?: ButtonVariant
  onClick?: () => void
  disabled?: boolean
  options?: DataTableButtonOptions
}

export interface DataTableToolBarProps {
  className?: string
  onReload?: () => void
  onAdd?: () => void
  actionButtons?: DataTableToolBarButton[]
  selectedActionButtons?: (selectedIds: any[]) => DataTableToolBarButton[]
  onSearch?: (search: string) => void
  loading?: boolean
}

const DataTableToolbar: React.FC<DataTableToolBarProps> = (props: DataTableToolBarProps) => {
  const { onReload, onAdd, className, actionButtons, onSearch, selectedActionButtons, loading } = props;

  const [search, setSearch] = useState('');

  const { selectedIds } = useDataTableSelectedContext();
  const { filterValues } = useDataTableFilterContext();
  const { setFilterModalOpen } = useDataTableSettersContext();

  const classes = classNames({
    'data-table-toolbar': true,
    [className!]: className !== undefined
  });

  const toolbarActionButtons: DataTableToolBarButton[] = [];
  if (FilterHelper.tableHasFilterValues(filterValues)) {
    toolbarActionButtons.push({ className: 'btn-success', key: 'Filter', icon: faFilter, onClick: () => setFilterModalOpen(true), toolTip: 'View Filters' });
  }
  if (onReload) toolbarActionButtons.push({ key: 'Reload', icon: faSync, onClick: onReload, toolTip: 'Reload' });
  if (onAdd) toolbarActionButtons.push({ key: 'Add', icon: faPlus, onClick: onAdd, toolTip: 'Add' });
  if (actionButtons && actionButtons.length) {
    actionButtons.forEach(e => toolbarActionButtons.push(e))
  }

  const renderAction = (button: DataTableToolBarButton) => {

    const { className, options, onClick, ...rest } = button;
    const shared: ButtonProps = { ...rest, showLoadingSkeleton: loading };
    shared.className = classNames({ 'data-table-toolbar-button': true, [button.className!]: button.className !== undefined });

    if (!options?.isConfirm) return <Button onClick={onClick} {...shared} />;
    return (
      <ButtonConfirm
        {...shared}
        onConfirm={() => { if (onClick) onClick(); }}
        modalBody={options.modalBody}
        modalBodyText={options.modalBodyText}
        modalHeader={options.modalHeader}
        modalNoText={options.modalNoText}
        modalYesText={options.modalYesText}
      />
    );
  };

  const handleSearch = (searchText: string) => {
    setSearch(searchText)
    if (onSearch) onSearch(searchText);
  }

  const selectedToolbarActionButtons: DataTableToolBarButton[] = !selectedActionButtons ? [] : selectedActionButtons(selectedIds);
  const hasSelectedIds = selectedIds && selectedIds.length ? true : false;

  return (
    <div className={classes}>
      {!hasSelectedIds && (
        <React.Fragment>
          <div className='data-table-toolbar-left'>
            <FormInput
              name='data-table-toolbar-search'
              className='data-table-toolbar-search mb-0'
              iconLeft={faSearch}
              value={search}
              onChange={(e) => handleSearch(e.currentTarget.value)}
              showLoadingSkeleton={loading}
            />
          </div>
          <div className='data-table-toolbar-actions'>
            {toolbarActionButtons.map(renderAction)}
          </div>
        </React.Fragment>
      )}
      {hasSelectedIds && (
        <React.Fragment>
          <div className='data-table-toolbar-left'>
            <h4 className='selected-title'>{`${selectedIds.length} Selected`}</h4>
          </div>
          <div className='data-table-toolbar-actions'>
            {selectedToolbarActionButtons.map(renderAction)}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default DataTableToolbar;