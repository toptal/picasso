/// <reference types="cypress" />

// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react'
import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { TestingPicasso } from '@toptal/picasso-test-utils'

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

Cypress.Commands.add('getByTestId', (testId, options) => {
  return cy.get(`[data-testid=${testId}]`, options)
})

Cypress.Commands.add('getByRole', (role, options) => {
  return cy.get(`[role=${role}]`, options)
})

Cypress.Commands.add(
  'hoverAndTakeHappoScreenshot',
  { prevSubject: true },
  (subject, options) => {
    // this is the official way to hover element in happo-e2e
    // "data-happo-hover" is being added and removed to mimic the state and
    // happo will be able to detect the hover state
    cy.get(subject.selector)
      .invoke('attr', 'data-happo-hover', true)
      .get('body')
      .happoScreenshot(options)

    cy.get(subject.selector).invoke('removeAttr', 'data-happo-hover')
  }
)

// happo-cypress serializes the live DOM and re-renders it statically in the
// cloud (no JS runs there). @base-ui/react drives enter transitions with a
// transient `data-starting-style` attribute that it removes on the next
// animation frame. If a screenshot is serialized before that frame, the
// attribute pins the element at its starting style (e.g. opacity-0) in the
// static render, producing a blank capture. Wait for any entering element to
// settle so the screenshot reflects the final state. No-op for the vast
// majority of screenshots, where no such element exists.
Cypress.Commands.overwrite(
  'happoScreenshot',
  (originalFn, subject, options) => {
    cy.get('[data-starting-style]', { timeout: 4000 }).should('not.exist')

    return originalFn(subject, options)
  }
)

Cypress.Commands.add('mount', (component, options, props = {}) => {
  // Wrap any parent components needed
  // ie: return mount(<MyProvider>{component}</MyProvider>, options)
  return mount(
    <TestingPicasso injectFirst {...props}>
      {component}
    </TestingPicasso>,
    options
  )
})
