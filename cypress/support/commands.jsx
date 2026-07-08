/// <reference types="cypress" />

// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react'
import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { TestingPicasso } from '@toptal/picasso-test-utils'

Cypress.Commands.add('isWithinViewport', { prevSubject: true }, subject => {
  const windowInnerWidth = Cypress.config(`viewportWidth`)
  const windowInnerHeight = Cypress.config(`viewportHeight`)

  // retried via .should() so a mid-scroll/mid-animation read converges instead
  // of failing (or falsely passing) a one-shot geometry check
  return cy.wrap(subject).should($el => {
    expect($el[0].isConnected, 'element attached').to.equal(true)

    const bounding = $el[0].getBoundingClientRect()

    expect(bounding.top).to.be.at.least(0)
    expect(bounding.left).to.be.at.least(0)
    expect(bounding.right).not.to.be.greaterThan(windowInnerWidth)
    expect(bounding.bottom).not.to.be.greaterThan(windowInnerHeight)
  })
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

  return cy.get(selector).should($els => {
    const current = Array.from($els, readTransitionStyles).join('|||')
    const wasPrevious = previous

    previous = current
    // passes only once two consecutive reads match — i.e. the transition has
    // come to rest. Cypress retries this callback until it passes or times out.
    expect(current, 'style transitions settled').to.equal(wasPrevious)
  })
}

// Gate on hover/focus style transitions (e.g. `transition-colors` on menu
// items) being at rest for every matched element before capturing.
Cypress.Commands.add('waitForTransitionsToSettle', selector =>
  waitForHoverToSettle(selector)
)

// Transient floating UI must be geometrically at rest before serializing:
// `@floating-ui/react` poppers (Picasso's Popper stamps `x-placement`, base-ui's
// Tooltip positions its `role="tooltip"` popup) commit their coordinates a frame
// or two after open, and notistack notifications (`role="alert"`) slide in via
// inline-style transforms that happo-cypress captures verbatim.
// Settled = two consecutive reads of every visible element's box match.
// Vacuous when nothing matches — asserting PRESENCE stays the callers' job.
const GEOMETRY_SETTLE_SELECTOR =
  '[x-placement], [role="tooltip"], [role="alert"]'

const readTransientBoxes = ($body, selector) => {
  const boxes = []

  $body.find(selector).each((_index, el) => {
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

const waitForTransientGeometryToSettle = (
  selector = GEOMETRY_SETTLE_SELECTOR
) => {
  let previous = null

  return cy.get('body').should($body => {
    const current = readTransientBoxes($body, selector)
    const wasPrevious = previous

    previous = current
    expect(current, 'transient geometry settled').to.equal(wasPrevious)
  })
}

// Gate on the matched elements' boxes being at rest (e.g. an Accordion height
// animation) — assert PRESENCE first; an empty match set settles vacuously.
Cypress.Commands.add('waitForGeometryToSettle', selector =>
  waitForTransientGeometryToSettle(selector)
)

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

// Gate on the DatePicker calendar being MOUNTED — it opens via async state, and
// the global geometry-settle passes vacuously while no popper is in the DOM.
Cypress.Commands.add('waitForCalendarOpen', () =>
  cy.get('.rdp-month').should('be.visible')
)

// Gate on every matched <img> having decoded — `be.visible` only asserts the
// layout box, not that the pixels loaded. Pass a selector to scope the check.
Cypress.Commands.add('waitForImagesDecoded', (selector = 'img') =>
  cy.get(selector).should($imgs => {
    $imgs.each((_index, img) => {
      expect(img.naturalWidth, 'image decoded').to.be.greaterThan(0)
    })
  })
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
        // then let poppers/notifications finish moving before serializing
        .then(() => waitForTransientGeometryToSettle())
        .then(() => originalFn(subject, options))
    )
  }
)

Cypress.Commands.add('mount', (component, options, props = {}) => {
  // Wrap any parent components needed
  // ie: return mount(<MyProvider>{component}</MyProvider>, options)
  return mount(<TestingPicasso {...props}>{component}</TestingPicasso>, options)
})
