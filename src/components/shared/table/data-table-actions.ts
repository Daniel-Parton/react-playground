import { IconDefinition, faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ButtonVariant, BootstrapButtonVariant } from '../buttons/shared';
import { DataTableButtonOptions } from './data-table/data-table-shared-types';

export interface DataTableAction<T> {
  iconFunc?: (dataRow: T) => IconDefinition
  icon?: IconDefinition
  tooltip?: string
  tooltipFunc?: (dataRow: T) => string
  text?: string
  variant?: ButtonVariant
  bsVariant?: BootstrapButtonVariant
  iconStyleFunc?: (dataRow: T) => any
  onClick: (dataRow: T) => void
  disabled?: boolean
  options?: DataTableButtonOptions
}

function deleteAction<T>(onClick: (dataRow: T) => void, bsVariant?: BootstrapButtonVariant, variant?: ButtonVariant) {
  const action: DataTableAction<T> = { icon: faTrash, onClick: onClick, variant, bsVariant };
  return action;
}

function editAction<T>(onClick: (dataRow: T) => void, bsVariant?: BootstrapButtonVariant, variant?: ButtonVariant) {
  const action: DataTableAction<T> = { icon: faEdit, onClick: onClick, variant, bsVariant };
  return action;
}

function viewAction<T>(onClick: (dataRow: T) => void, bsVariant?: BootstrapButtonVariant, variant?: ButtonVariant) {
  const action: DataTableAction<T> = { icon: faSearch, onClick: onClick, variant, bsVariant };
  return action;
}

const Actions = {
  edit: editAction,
  view: viewAction,
  delete: deleteAction
};

export default Actions;
