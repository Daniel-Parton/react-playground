import { CypressOptions } from '../../../helpers/getter-helper'
import { LoginFormValues } from '../../../../../src/components/dashboard/forms/login-form'
import { nameOf } from '../../../../../src/helpers/object-helper'

const getters = {
  email: {
    input: (options?: CypressOptions) => cy.formControl(nameOf<LoginFormValues>('email'), 'input', undefined, options),
    error: (options?: CypressOptions) => cy.formControlError(nameOf<LoginFormValues>('email'), undefined, options),
  },
  password: {
    input: (options?: CypressOptions) => cy.formControl(nameOf<LoginFormValues>('password'), 'input', undefined, options),
    error: (options?: CypressOptions) => cy.formControlError(nameOf<LoginFormValues>('password'), undefined, options),
  },
  submitButton: (options?: CypressOptions) => cy.getSubmit(options),
}

export default getters;