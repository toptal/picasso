/// <reference types="cypress" />

// Registers a `before()` hook that loads the shared avatar fixture and returns
// a getter for its data URI (empty until the hook runs). Call at spec module
// scope; read the getter inside tests, after the hook has resolved.
export const loadAvatarFixture = () => {
  let src = ''

  before(() => {
    // eslint-disable-next-line promise/catch-or-return
    cy.fixture('pablo.jpg').then(image => {
      src = 'data:image/jpg;base64,' + image

      return image
    })
  })

  return () => src
}
