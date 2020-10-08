import { CypressOptions } from '../../../helpers/getter-helper'

const getters = {
  loginForm: (options?: CypressOptions) => cy.selectNth('.nav-link', 1, options),
  userRegistration: (options?: CypressOptions) => cy.selectNth('.nav-link', 2, options),
}

export default getters;