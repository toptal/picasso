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
  Tooltip,
} from '@toptal/picasso'

/**
 * Contract tests for the commands `@toptal/picasso-cypress-utils` publishes,
 * run against the real components whose DOM they encode.
 */

const registerAll = () => registerPicassoCypressCommands()

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

const QuotedOptionSelect = () => (
  <Container padded='medium'>
    <Select
      data-testid='quoted'
      onChange={() => {}}
      options={[
        { value: 'q', text: 'The "Best" Option' },
        { value: 'a"b', text: 'Quoted Value' },
      ]}
      placeholder='Pick…'
      value=''
    />
  </Container>
)

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

const ControlledCheckbox = ({ onChange }: { onChange: () => void }) => (
  <Container padded='medium'>
    <Checkbox
      checked={false}
      data-testid='pinned'
      label='Pinned'
      onChange={onChange}
    />
  </Container>
)

const DisabledTriggerTooltip = () => (
  <Container padded='medium'>
    <Tooltip content='Why this is disabled'>
      <span data-testid='save-wrap'>
        <Button data-testid='save' disabled>
          Save
        </Button>
      </span>
    </Tooltip>
  </Container>
)

describe('picasso-cypress-utils', () => {
  describe('setChecked', () => {
    it('checks and unchecks through the visible role element', () => {
      cy.mount(<Toggles />)

      cy.getByTestId('newsletter').setChecked()
      cy.getByTestId('newsletter').assertChecked()

      cy.getByTestId('newsletter').setChecked()
      cy.getByTestId('newsletter').assertChecked()

      cy.getByTestId('newsletter').setChecked(false)
      cy.getByTestId('newsletter').assertChecked(false)
    })

    it('accepts the hidden input as the subject', () => {
      cy.mount(<Toggles />)

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
    it('resolves the control when the subject is the input itself', () => {
      cy.mount(<Toggles />)

      cy.get('input[value="free"]').assertChecked()
      cy.get('input[value="pro"]').assertChecked(false)
    })

    it(
      'asserts every control inside a wrapper, not just the first',
      { defaultCommandTimeout: 1000 },
      () => {
        cy.mount(<Toggles />)

        expectFailure('expected the input 2 of 2 to be checked')

        cy.getByTestId('plan-group').assertChecked()
      }
    )

    it(
      'fails loudly when the subject contains no control',
      { defaultCommandTimeout: 1000 },
      () => {
        cy.mount(<Container data-testid='no-controls'>Nothing here</Container>)

        expectFailure(
          'expected to find a checkbox/switch/radio control inside the subject'
        )

        cy.getByTestId('no-controls').assertChecked()
      }
    )
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

    it('picks an option whose value contains a quote', () => {
      cy.mount(<QuotedOptionSelect />)

      cy.getByTestId('quoted').selectOption({ value: 'a"b' })
      cy.getPopup().should('not.exist')
    })

    it('yields the open popper and its options', () => {
      cy.mount(<SelectHarness />)

      cy.getByTestId('country').click()
      cy.getPopup()
        .find('[role="option"]')
        .should('have.length', OPTIONS.length)
    })
  })

  describe('toggleControl', () => {
    it('dispatches a toggle on a pinned controlled checkbox', () => {
      const onChange = cy.stub().as('change')

      cy.mount(<ControlledCheckbox onChange={onChange} />)

      cy.getByTestId('pinned').toggleControl().click()
      cy.get('@change').should('have.been.calledOnce')
      cy.getByTestId('pinned').assertChecked(false)
    })

    it('resolves the role element from the hidden input and from a wrapper', () => {
      cy.mount(<Toggles />)

      cy.getByTestId('newsletter-input')
        .toggleControl()
        .should('have.attr', 'role', 'checkbox')
      cy.getByTestId('notifications')
        .toggleControl()
        .should('have.attr', 'role', 'switch')
    })

    it('drives focus for touched-state flows', () => {
      cy.mount(<Toggles />)

      cy.getByTestId('newsletter').toggleControl().focus()
      cy.focused().should('have.attr', 'role', 'checkbox')
      cy.getByTestId('newsletter').toggleControl().blur()
      cy.focused().should('not.exist')
    })

    it(
      'fails loudly on a subject with no toggle control',
      { defaultCommandTimeout: 1000 },
      () => {
        cy.mount(<Container data-testid='plain'>Nothing here</Container>)

        expectFailure('no [role="checkbox"|"switch"] element found')

        cy.getByTestId('plain').toggleControl()
      }
    )
  })

  describe('queryPopup', () => {
    it('passes negative assertions when the popup is absent', () => {
      cy.mount(<SelectHarness />)

      cy.queryPopup().should('not.exist')
      cy.queryPopup('[role="option"]', 'Croatia').should('not.exist')
    })

    it('passes when the popup is open without the option', () => {
      cy.mount(<SelectHarness />)

      cy.getByTestId('country').click()
      cy.getPopup().should('be.visible')
      cy.queryPopup('[role="option"]', 'Atlantis').should('not.exist')
      cy.queryPopup('[role="option"]', 'Croatia').should('exist')
    })

    it('applies text to the popup itself when no inner selector is given', () => {
      cy.mount(<SelectHarness />)

      cy.getByTestId('country').click()
      cy.getPopup().should('be.visible')
      cy.queryPopup(undefined, 'Croatia').should('exist')
      cy.queryPopup(undefined, 'Atlantis').should('not.exist')
    })

    it('matches text containing quotes, which jQuery :contains cannot', () => {
      cy.mount(<QuotedOptionSelect />)

      cy.getByTestId('quoted').click()
      cy.queryPopup('[role="option"]', 'The "Best" Option').should('exist')
      cy.queryPopup('[role="option"]', 'No "Such" Option').should('not.exist')
    })
  })

  describe('hoverAnchor', () => {
    it('opens a tooltip whose trigger child is natively disabled', () => {
      cy.mount(<DisabledTriggerTooltip />)

      cy.getByTestId('save').hoverAnchor()
      cy.getTooltip().should('contain', 'Why this is disabled')
    })

    it('closes the tooltip again via unhoverAnchor', () => {
      cy.mount(<DisabledTriggerTooltip />)

      cy.getByTestId('save').hoverAnchor()
      cy.getTooltip().should('be.visible')
      cy.getByTestId('save').unhoverAnchor()
      cy.getTooltip().should('not.exist')
    })

    it('queryTooltip passes negative assertions inside an absent tooltip', () => {
      cy.mount(<DisabledTriggerTooltip />)

      cy.queryTooltip().should('not.exist')
      cy.queryTooltip('div', 'Why this is disabled').should('not.exist')

      cy.getByTestId('save').hoverAnchor()
      cy.queryTooltip('div', 'Why this is disabled').should('exist')
      cy.queryTooltip(undefined, 'Why this is disabled').should('exist')
      cy.queryTooltip(undefined, 'Some other reason').should('not.exist')
    })

    it('yields the anchor for chaining', () => {
      cy.mount(<DisabledTriggerTooltip />)

      cy.getByTestId('save-wrap')
        .hoverAnchor()
        .should('have.attr', 'data-picasso-tooltip-anchor')
    })
  })

  describe('registerPicassoCypressCommands', () => {
    it('is idempotent — a repeat call does not throw', () => {
      expect(registerAll).not.to.throw()
    })
  })
})
