import React, { useState } from 'react'
import { registerPicassoCypressCommands } from '@toptal/picasso-cypress-utils'
import type { SelectValueType } from '@toptal/picasso'
import {
  Button,
  Checkbox,
  Container,
  Radio,
  Select,
  Switch,
} from '@toptal/picasso'

/**
 * Exercises the commands `@toptal/picasso-cypress-utils` publishes, against the
 * real components whose DOM they encode. Picasso's Cypress support registers
 * the package rather than a private copy, so this suite is the contract test
 * for the consumer-facing API.
 */

const registerAll = () => registerPicassoCypressCommands()

const registerNone = () =>
  registerPicassoCypressCommands({
    skip: [
      'assertChecked',
      'assertDisabled',
      'getPopup',
      'getTooltip',
      'selectOption',
      'setChecked',
    ],
  })

/** Swallows the next command failure once its message matches. */
const expectFailure = (fragment: string) =>
  cy.on('fail', error => {
    expect(error.message).to.contain(fragment)

    return false
  })

const OPTIONS = [
  { value: 'hr', text: 'Croatia' },
  { value: 'br', text: 'Brazil' },
  { value: 'ke', text: 'Kenya' },
]

const Toggles = () => {
  const [checked, setChecked] = useState(false)
  const [switched, setSwitched] = useState(true)

  return (
    <Container padded='medium'>
      <Checkbox
        checked={checked}
        data-testid='newsletter'
        label='Newsletter'
        onChange={(_event, next) => setChecked(next)}
        testIds={{ input: 'newsletter-input' }}
      />
      <Checkbox checked={false} data-testid='terms' disabled label='Terms' />
      <Switch
        checked={switched}
        data-testid='notifications'
        onChange={(_event, next) => setSwitched(next)}
      />
      <Radio.Group
        name='plan'
        onChange={() => {}}
        value='free'
        data-testid='plan-group'
      >
        <Radio label='Free' value='free' />
        <Radio label='Pro' value='pro' />
      </Radio.Group>
      <Button data-testid='submit' disabled>
        Submit
      </Button>
      <Button data-testid='cancel'>Cancel</Button>
    </Container>
  )
}

const SelectHarness = () => {
  const [value, setValue] = useState<SelectValueType>('')

  return (
    <Container padded='medium'>
      <Select
        data-testid='country'
        onChange={event => setValue(event.target.value as SelectValueType)}
        options={OPTIONS}
        placeholder='Choose a country…'
        value={value}
      />
      <span data-testid='selected'>{value}</span>
    </Container>
  )
}

describe('picasso-cypress-utils', () => {
  describe('setChecked', () => {
    it('checks and unchecks through the visible role element', () => {
      cy.mount(<Toggles />)

      cy.getByTestId('newsletter').setChecked()
      cy.getByTestId('newsletter').assertChecked()

      // ensure semantics: a second call is a no-op, not a toggle
      cy.getByTestId('newsletter').setChecked()
      cy.getByTestId('newsletter').assertChecked()

      cy.getByTestId('newsletter').setChecked(false)
      cy.getByTestId('newsletter').assertChecked(false)
    })

    it('accepts the hidden input as the subject', () => {
      cy.mount(<Toggles />)

      // testIds={{ input }} stamps the visually-hidden sibling input
      cy.getByTestId('newsletter-input').setChecked()
      cy.getByTestId('newsletter').assertChecked()
    })

    it('drives a Switch', () => {
      cy.mount(<Toggles />)

      cy.getByTestId('notifications').assertChecked()
      cy.getByTestId('notifications').setChecked(false)
      cy.getByTestId('notifications').assertChecked(false)
    })

    it('refuses a radio and points at check()', () => {
      cy.mount(<Toggles />)

      expectFailure('use check()/click()')

      cy.get('input[value="pro"]').setChecked()
    })
  })

  describe('assertChecked', () => {
    it('resolves controls inside a wrapper', () => {
      cy.mount(<Toggles />)

      // the group wrapper holds two radios; only one is checked, so asserting
      // "checked" across all of them must fail
      cy.get('input[value="free"]').assertChecked()
      cy.get('input[value="pro"]').assertChecked(false)
    })

    it('fails loudly when the subject contains no control', () => {
      cy.mount(<Container data-testid='no-controls'>Nothing here</Container>)

      expectFailure(
        'expected to find a checkbox/switch/radio control inside the subject'
      )

      // a plain container is never `:checked`, so should('be.checked') would
      // pass vacuously here — the command must report the missing control
      cy.getByTestId('no-controls').assertChecked()
    })
  })

  describe('assertDisabled', () => {
    it('reads aria-disabled on a role element', () => {
      cy.mount(<Toggles />)

      cy.getByTestId('terms').assertDisabled()
      cy.getByTestId('newsletter').assertDisabled(false)
    })

    it('reads the native property on a button', () => {
      cy.mount(<Toggles />)

      cy.getByTestId('submit').assertDisabled()
      cy.getByTestId('cancel').assertDisabled(false)
    })
  })

  describe('getPopup / selectOption', () => {
    it('picks an option by text', () => {
      cy.mount(<SelectHarness />)

      cy.getByTestId('country').selectOption('Croatia')
      cy.getByTestId('selected').should('have.text', 'hr')
      cy.getPopup().should('not.exist')
    })

    it('picks an option by value', () => {
      cy.mount(<SelectHarness />)

      cy.getByTestId('country').selectOption({ value: 'ke' })
      cy.getByTestId('selected').should('have.text', 'ke')
    })

    it('yields the open popper and its options', () => {
      cy.mount(<SelectHarness />)

      cy.getByTestId('country').click()
      cy.getPopup()
        .find('[role="option"]')
        .should('have.length', OPTIONS.length)
    })
  })

  describe('registerPicassoCypressCommands', () => {
    // The support file already registered every command. Cypress only throws
    // for duplicate *query* commands — plain Commands.add lets the last
    // registration silently overwrite a same-named command — so a repeat call
    // must stay safe, and `skip` exists to keep an app's own version rather
    // than to avoid a crash.
    it('tolerates a repeat registration (last one wins)', () => {
      expect(registerAll).not.to.throw()
    })

    it('accepts a skip list covering every command', () => {
      expect(registerNone).not.to.throw()
    })
  })
})
