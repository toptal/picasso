/// <reference types="cypress" />

Cypress.Commands.add('isWithinViewport', { prevSubject: true }, subject => {
  const windowInnerWidth = Cypress.config(`viewportWidth`)
  const windowInnerHeight = Cypress.config(`viewportHeight`)

  const bounding = subject[0].getBoundingClientRect()

  const rightBoundOfWindow = windowInnerWidth
  const bottomBoundOfWindow = windowInnerHeight

  expect(bounding.top).to.be.at.least(0)
  expect(bounding.left).to.be.at.least(0)
  expect(bounding.right).not.to.be.greaterThan(rightBoundOfWindow)
  expect(bounding.bottom).not.to.be.greaterThan(bottomBoundOfWindow)

  return subject
})

Cypress.Commands.add(
  'pseudo',
  {
    prevSubject: 'element'
  },
  (subject, name, property) => {
    const window = subject[0].ownerDocument.defaultView
    const before = window.getComputedStyle(subject[0], name)

    if (!before) {
      throw new Error(`${subject} doesn't have :${name} pseudo element.`)
    }

    return before.getPropertyValue(property).replace(/(^")|("$)/g, '')
  }
)
