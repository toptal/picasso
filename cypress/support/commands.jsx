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

// Wait for hover/focus style transitions to settle before capturing — the
// static happo snapshot would otherwise freeze a non-deterministic
// mid-transition color.
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
    // passes only once two consecutive reads match — i.e. transitions at rest
    expect(current, 'style transitions settled').to.equal(wasPrevious)
  })
}

// Gate on hover/focus style transitions (e.g. `transition-colors` on menu
// items) being at rest for every matched element before capturing.
Cypress.Commands.add('waitForTransitionsToSettle', selector =>
  waitForHoverToSettle(selector)
)

// Transient floating UI must be geometrically at rest before serializing:
// poppers (`x-placement`) and tooltips (`role="tooltip"`) commit their
// coordinates a frame or two after opening, and notifications (`role="alert"`)
// slide in via inline-style transforms captured verbatim in the static snapshot.
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
    // capture freezes a mid-transition color
    waitForHoverToSettle(subject.selector)

    cy.get('body').happoScreenshot(options)

    cy.get(subject.selector).invoke('removeAttr', 'data-happo-hover')
  }
)

// Gate on an overlay (Modal/Drawer/PromptModal `[role="dialog"]`) being open AND
// past its enter transition: the overlay fades in via `data-starting-style`
// (opacity-0 → 1, removed once the transition starts); capturing mid-fade
// composites bordered content at partial opacity, producing edge artifacts.
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
// cloud (no JS runs there). `data-starting-style` is removed one frame after
// mount; capturing before removal pins the element at its starting style
// (e.g. opacity-0), producing a blank capture. `data-ending-style` marks an
// exit in flight — wait it out too.
Cypress.Commands.overwrite(
  'happoScreenshot',
  (originalFn, subject, options) => {
    return (
      cy
        .get('[data-starting-style], [data-ending-style]', { timeout: 4000 })
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
