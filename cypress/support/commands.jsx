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

// happo-cypress serializes the live DOM and re-renders it statically (no JS,
// no CSS transitions replay) at the moment happoScreenshot runs. Hover styling
// that animates (e.g. Radio/Checkbox/Button ease their border-color over
// ~350ms) is therefore captured at whatever intermediate frame happens to be
// current when serialization fires — a non-deterministic color that diffs
// against the baseline. Wait for the transition-driven computed styles to stop
// changing before snapshotting, so the capture reflects the settled hover
// state rather than a mid-transition frame.
//
// Implemented via `.should()`, whose callback Cypress retries on its own
// animation-frame loop (bounded by defaultCommandTimeout) until it passes —
// so there are no hardcoded durations or poll intervals. The assertion only
// passes once two consecutive reads are identical, i.e. the transition (and
// any on its `::before`, captured here too) has come to rest.
const readTransitionStyles = el => {
  const styleOf = pseudo => {
    const style = window.getComputedStyle(el, pseudo)

    return [
      style.borderColor,
      style.backgroundColor,
      style.boxShadow,
      style.color,
      style.opacity,
    ].join('|')
  }

  return [styleOf(null), styleOf('::before'), styleOf('::after')].join('||')
}

const waitForHoverToSettle = selector => {
  let previous = null

  cy.get(selector).should($el => {
    const current = readTransitionStyles($el[0])
    const wasPrevious = previous

    previous = current
    // passes only once two consecutive reads match — i.e. the transition has
    // come to rest. Cypress retries this callback until it passes or times out.
    expect(current, 'hover transition settled').to.equal(wasPrevious)
  })
}

Cypress.Commands.add(
  'hoverAndTakeHappoScreenshot',
  { prevSubject: true },
  (subject, options) => {
    // this is the official way to hover element in happo-e2e
    // "data-happo-hover" is being added and removed to mimic the state and
    // happo will be able to detect the hover state
    cy.get(subject.selector).invoke('attr', 'data-happo-hover', true)

    // let the hover transition finish before serializing, otherwise the static
    // capture freezes a mid-transition color (see waitForHoverToSettle above)
    waitForHoverToSettle(subject.selector)

    cy.get('body').happoScreenshot(options)

    cy.get(subject.selector).invoke('removeAttr', 'data-happo-hover')
  }
)

// happo-cypress serializes the live DOM and re-renders it statically in the
// cloud (no JS runs there). @base-ui/react removes `data-starting-style` one
// frame after mount; if captured before removal, the attribute pins the element
// at its starting style (e.g. opacity-0), producing a blank capture.
Cypress.Commands.overwrite(
  'happoScreenshot',
  (originalFn, subject, options) => {
    return cy
      .get('[data-starting-style]', { timeout: 4000 })
      .should('not.exist')
      .then(() => originalFn(subject, options))
  }
)

Cypress.Commands.add('mount', (component, options, props = {}) => {
  // Wrap any parent components needed
  // ie: return mount(<MyProvider>{component}</MyProvider>, options)
  return mount(<TestingPicasso {...props}>{component}</TestingPicasso>, options)
})
