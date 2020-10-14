import { CypressOptions } from '../../../helpers/getter-helper'
const getters = {
  tab1: (options?: CypressOptions) => cy.selectNth('.nav-link', 1, options),
  tab2: (options?: CypressOptions) => cy.selectNth('.nav-link', 2, options),
  tab3: (options?: CypressOptions) => cy.selectNth('.nav-link', 3, options),
  tab4: {
    topLevel: (options?: CypressOptions) => cy.selectNth('.nav-link', 4, options),
  }
}

export default getters;