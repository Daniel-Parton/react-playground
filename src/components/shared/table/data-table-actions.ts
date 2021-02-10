import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { ButtonVariant, BootstrapButtonVariant } from '../buttons/shared';
import { DataTableButtonOptions } from './data-table/data-table-shared-types';

export interface DataTableAction<T> {
  iconFunc?: (dataRow: T) => IconType
  icon?: IconType
  tooltip?: string
  tooltipFunc?: (dataRow: T) => string
  text?: string
  variant?: ButtonVariant
  bsVariant?: BootstrapButtonVariant
  onClick: (dataRow: T) => void
  disabled?: boolean
  options?: DataTableButtonOptions
}

function deleteAction<T>(onClick: (dataRow: T) => void, bsVariant?: BootstrapButtonVariant, variant?: ButtonVariant) {
  const action: DataTableAction<T> = { icon: FaTrash, onClick: onClick, variant, bsVariant };
  return action;
}

function editAction<T>(onClick: (dataRow: T) => void, bsVariant?: BootstrapButtonVariant, variant?: ButtonVariant) {
  const action: DataTableAction<T> = { icon: FaEdit, onClick: onClick, variant, bsVariant };
  return action;
}

function viewAction<T>(onClick: (dataRow: T) => void, bsVariant?: BootstrapButtonVariant, variant?: ButtonVariant) {
  const action: DataTableAction<T> = { icon: FaSearch, onClick: onClick, variant, bsVariant };
  return action;
}

const Actions = {
  edit: editAction,
  view: viewAction,
  delete: deleteAction
};

export default Actions;
