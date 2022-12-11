import { getContainerEl } from '@cypress/mount-utils'

Cypress.Commands.add(`mount`, html => {
  const root = getContainerEl()
  root.innerHTML = html
})
