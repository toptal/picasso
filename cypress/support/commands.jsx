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

// A popper positioned by `@floating-ui/react` (Dropdown/Menu/Popper) commits
// its coordinates a frame or two after open, driven by `autoUpdate` — so its
// `getBoundingClientRect()` keeps changing across animation frames right after
// it appears. happo-cypress serializes the live DOM at a single instant; if
// that instant lands mid-settle, the whole popup (and anything measured from
// it) is captured a fraction of a pixel off, diffing against the baseline.
// Picasso stamps `x-placement` on the positioned floating node, so its presence
// marks a popper that must be geometrically at rest before we serialize.
//
// Waited on via `.should()`, whose callback Cypress retries on its own
// animation-frame loop (bounded by defaultCommandTimeout) until it passes — no
// hardcoded durations. The assertion passes once two consecutive reads of every
// visible popper's box are identical, i.e. positioning has come to rest. Closed
// `keepMounted` poppers (rendered but `display:none`) are skipped as they carry
// no meaningful geometry. When no popper is open the set is empty and the
// assertion passes immediately, so this is a no-op for non-popper snapshots.
const readPopperBoxes = $body => {
  const boxes = []

  $body.find('[x-placement]').each((_index, el) => {
    const rect = el.getBoundingClientRect()

    // skip non-rendered nodes (display:none keepMounted poppers report 0×0)
    if (rect.width === 0 && rect.height === 0) {
      return
    }

    boxes.push(
      [rect.top, rect.left, rect.width, rect.height]
        .map(value => Math.round(value * 100) / 100)
        .join(',')
    )
  })

  return boxes.join('|')
}

const waitForPoppersToSettle = () => {
  let previous = null

  return cy.get('body').should($body => {
    const current = readPopperBoxes($body)
    const wasPrevious = previous

    previous = current
    // passes only once two consecutive reads match — i.e. every open popper has
    // finished positioning. Cypress retries this callback until it passes.
    expect(current, 'popper positioning settled').to.equal(wasPrevious)
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

// Gate on an overlay (Modal/Drawer/PromptModal `[role="dialog"]`, …) being open
// AND past its @base-ui/react enter transition before proceeding. Base UI fades
// the overlay in (data-starting-style: opacity-0 → 1) and removes
// `data-starting-style` once the transition starts; capturing mid-fade
// composites bordered content (e.g. a secondary button) at partial opacity,
// producing edge artifacts. Retried on Cypress's own loop via `.should()` — no
// hardcoded durations. Shared so Modal/PromptModal/Drawer specs stop each
// hand-rolling the same assertion.
Cypress.Commands.add('waitForOverlayOpen', (selector = '[role="dialog"]') =>
  cy
    .get(selector)
    .should('be.visible')
    .and('not.have.attr', 'data-starting-style')
)

// happo-cypress serializes the live DOM and re-renders it statically in the
// cloud (no JS runs there). @base-ui/react removes `data-starting-style` one
// frame after mount; if captured before removal, the attribute pins the element
// at its starting style (e.g. opacity-0), producing a blank capture.
Cypress.Commands.overwrite(
  'happoScreenshot',
  (originalFn, subject, options) => {
    return (
      cy
        .get('[data-starting-style]', { timeout: 4000 })
        .should('not.exist')
        // then let any open @floating-ui popper finish positioning, so the static
        // capture reflects its settled geometry (see waitForPoppersToSettle above)
        .then(() => waitForPoppersToSettle())
        .then(() => originalFn(subject, options))
    )
  }
)

Cypress.Commands.add('mount', (component, options, props = {}) => {
  // Wrap any parent components needed
  // ie: return mount(<MyProvider>{component}</MyProvider>, options)
  return mount(<TestingPicasso {...props}>{component}</TestingPicasso>, options)
})
