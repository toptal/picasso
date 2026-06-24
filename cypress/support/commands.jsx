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

// eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope -- Cypress browser-only support file
const nativeRequestAnimationFrame = window.requestAnimationFrame.bind(window)
// eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope -- Cypress browser-only support file
const nativeSetTimeout = window.setTimeout.bind(window)

// happo-cypress serializes the live DOM and re-renders it statically in the
// cloud (no JS runs there). Two issues must be resolved before serializing:
// 1. @base-ui/react removes `data-starting-style` one frame after mount; if
//    captured before removal, the attribute pins the element at its starting
//    style (e.g. opacity-0), producing a blank capture.
// 2. @floating-ui/react applies computed position one frame after mount;
//    capturing before that frame records the pre-position state (popper at 0,0).
// Native RAF/setTimeout are captured at module scope before any cy.clock()
// stubbing — Calendar.spec stubs window timers, so a wait built on them hangs.
Cypress.Commands.overwrite(
  'happoScreenshot',
  (originalFn, subject, options) => {
    return cy
      .get('[data-starting-style]', { timeout: 4000 })
      .should('not.exist')
      .then(
        () =>
          new Cypress.Promise(resolve => {
            // Wait 2 RAF frames (covers @base-ui/react starting-style removal and
            // floating-ui's initial position commit), then an additional 150 ms to
            // let autoUpdate's scroll-triggered re-position settle. Sequential, not
            // racing — the prior implementation raced RAF vs setTimeout and could
            // resolve before floating-ui's second cycle completed.
            nativeRequestAnimationFrame(() =>
              nativeRequestAnimationFrame(() => nativeSetTimeout(resolve, 150))
            )
          })
      )
      .then(() => originalFn(subject, options))
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
