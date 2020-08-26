import { OptionModel } from "../../../../types/shared-types";

export interface DataTableFilterDefinitionOptions {
  options?: OptionModel<any>[]
}

export interface DataTableFilterDefinition {
  type: DataTableFilterType
  options?: DataTableFilterDefinitionOptions
}

export type DataTableFilterType = 'StringAll' | 'StringStartsWith' | 'StringEndsWWith' | 'StringContains' | 'StringEquals' |
  'NumberEquals' | 'NumberRange' | 'Options' | 'DateRange'

export type OrderByDirection = 'asc' | 'desc';

export interface DataTableButtonOptions {
  isConfirm?: boolean
  modalHeader?: string
  modalBodyText?: string
  modalYesText?: string
  modalNoText?: string
  modalBody?: any
}