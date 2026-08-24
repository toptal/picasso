import { assertChecked } from './assert-checked'
import { assertDisabled } from './assert-disabled'
import { getPopup } from './get-popup'
import { getTooltip } from './get-tooltip'
import { hoverAnchor } from './hover-anchor'
import { queryPopup } from './query-popup'
import { toggleControl } from './toggle-control'
import type { SelectOptionTarget } from './select-option'
import { selectOption } from './select-option'
import { setChecked } from './set-checked'

export type PicassoCommandName =
  | 'assertChecked'
  | 'assertDisabled'
  | 'getPopup'
  | 'getTooltip'
  | 'hoverAnchor'
  | 'queryPopup'
  | 'selectOption'
  | 'setChecked'
  | 'toggleControl'

export type RegisterOptions = {
  /**
   * Command names to leave unregistered, for repos that already own one of
   * them — e.g. a hand-rolled `setChecked` from an earlier migration layer.
   * Cypress silently lets a later `Commands.add` overwrite a same-named
   * command, so without `skip` whichever registration runs last wins.
   */
  skip?: PicassoCommandName[]
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /** Yields the open Picasso popup (Select/Dropdown/Menu/DatePicker). */
      getPopup: typeof getPopup
      /** Yields the open Tooltip — only real Tooltips keep `role="tooltip"`. */
      getTooltip: typeof getTooltip
      /** One-query popup lookup for negative/optional assertions — attach `should` directly. */
      queryPopup: (innerSelector?: string) => Chainable<JQuery<HTMLElement>>
      /** Yields the visible role element of a Checkbox/Switch from any subject shape. */
      toggleControl: () => Chainable<JQuery<HTMLElement>>
      /** Hovers a Tooltip's anchor (unforced) — for natively disabled triggers. */
      hoverAnchor: () => Chainable<JQuery<HTMLElement>>
      /** Ensures a Checkbox/Switch state by clicking its visible role element. */
      setChecked: (desired?: boolean) => Chainable<JQuery<HTMLElement>>
      /** Asserts checked state off a role element, input, or wrapper. */
      assertChecked: (desired?: boolean) => Chainable<JQuery<HTMLElement>>
      /** Asserts disabled state (native property or `aria-disabled`). */
      assertDisabled: (desired?: boolean) => Chainable<JQuery<HTMLElement>>
      /** Opens a Select from its trigger and picks one option. */
      selectOption: (
        target: SelectOptionTarget
      ) => Chainable<JQuery<HTMLElement>>
    }
  }
}

/**
 * Registers Picasso's Cypress commands. Call it from your Cypress support file.
 *
 * Wrapped in a function rather than run as an import side effect so bundlers
 * cannot tree-shake the registrations away, and so repos that already own one
 * of these names can opt out instead of having their version silently
 * overwritten. Note the asymmetry: plain `Commands.add` lets the last
 * registration win, while duplicate *query* commands (`toggleControl`) make
 * Cypress throw — so a repeat call must skip the queries.
 *
 * Deliberately no generic `getByTestId`/`findByTestId`: every Toptal app
 * already ships its own (with differing signatures — `@topkit/cypress-utils`
 * takes variadic extra selectors), and they encode nothing about Picasso.
 * This package registers only commands that break when Picasso's DOM changes.
 *
 * @example
 * import { registerPicassoCypressCommands } from '@toptal/picasso-cypress-utils'
 *
 * registerPicassoCypressCommands()
 *
 * @example
 * // an app that still keeps its own setChecked from a hand-rolled layer
 * registerPicassoCypressCommands({ skip: ['setChecked'] })
 */
export const registerPicassoCypressCommands = ({
  skip = [],
}: RegisterOptions = {}) => {
  const shouldRegister = (name: PicassoCommandName) => !skip.includes(name)

  if (shouldRegister('getPopup')) {
    Cypress.Commands.add('getPopup', getPopup)
  }

  if (shouldRegister('getTooltip')) {
    Cypress.Commands.add('getTooltip', getTooltip)
  }

  if (shouldRegister('queryPopup')) {
    Cypress.Commands.add('queryPopup', queryPopup)
  }

  if (shouldRegister('toggleControl')) {
    Cypress.Commands.addQuery('toggleControl', toggleControl)
  }

  if (shouldRegister('hoverAnchor')) {
    Cypress.Commands.add('hoverAnchor', { prevSubject: 'element' }, hoverAnchor)
  }

  if (shouldRegister('setChecked')) {
    Cypress.Commands.add('setChecked', { prevSubject: 'element' }, setChecked)
  }

  if (shouldRegister('assertChecked')) {
    Cypress.Commands.add(
      'assertChecked',
      { prevSubject: 'element' },
      assertChecked
    )
  }

  if (shouldRegister('assertDisabled')) {
    Cypress.Commands.add(
      'assertDisabled',
      { prevSubject: 'element' },
      assertDisabled
    )
  }

  if (shouldRegister('selectOption')) {
    Cypress.Commands.add(
      'selectOption',
      { prevSubject: 'element' },
      selectOption
    )
  }
}
