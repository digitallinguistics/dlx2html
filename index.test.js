import convert from './index.js'

describe(`Cypress`, function() {

  it(`mounts HTML`, function() {
    const text = `This is an interlinear gloss.`
    cy.mount(`<div class=igl>${ text }</div>`)
    cy.get(`.igl`)
    .should(`have.text`, text)
  })

})
