import React, { useState, ChangeEvent } from 'react'
import { mount } from '@cypress/react'
import {
  Select,
  Form,
  Container,
  SelectProps,
  Settings16
} from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { noop, palette } from '@toptal/picasso/utils'
import { ValueType } from '@toptal/picasso/Select'

const testIds = {
  resetButton: 'reset-adornment'
}

const TestSelect = ({
  onChange = noop,
  value = undefined,
  multiple = false,
  options = OPTIONS,
  placeholder = 'Choose an option...',
  width = 'auto',
  native = false,
  error = false,
  disabled = false,
  loading = false,
  enableReset = false,
  searchThreshold,
  iconPosition,
  icon,
  menuWidth,
  limit,
  testIds
}: Partial<SelectProps> = {}) => (
  <Select
    data-testid='select'
    onChange={onChange}
    options={options}
    value={value}
    placeholder={placeholder}
    width={width}
    multiple={multiple}
    native={native}
    error={error}
    disabled={disabled}
    loading={loading}
    enableReset={enableReset}
    menuWidth={menuWidth}
    icon={icon}
    iconPosition={iconPosition}
    searchThreshold={searchThreshold}
    limit={limit}
    testIds={testIds}
  />
)

const TestUncontrolledSelect = (
  props: Omit<Partial<SelectProps>, 'value' | 'onChange'> = {}
) => {
  const [value, setValue] = useState<ValueType | ValueType[]>()

  const handleChange = (
    event: ChangeEvent<{ name?: string; value: ValueType | ValueType[] }>
  ) => {
    setValue(event.target.value)
  }

  return <TestSelect onChange={handleChange} value={value} {...props} />
}

const SelectNativeExample = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (
    event: ChangeEvent<{
      name?: string | undefined
      value: string
    }>
  ) => {
    setValue(event.target.value)
  }

  return (
    <TestingPicasso>
      <Container flex>
        <Form.Field>
          <Form.Label>Native select</Form.Label>
          <Select
            onChange={handleChange}
            options={OPTIONS}
            value={value}
            placeholder='Choose an option...'
            width='auto'
            native
          />
        </Form.Field>
      </Container>
    </TestingPicasso>
  )
}

const MANY_OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
  { value: '5', text: 'Option 5' },
  { value: '6', text: 'Option 6' },
  { value: '7', text: 'Option 7' },
  { value: '8', text: 'Option 8' },
  { value: '9', text: 'Option 9' },
  { value: '10', text: 'Option 10' }
]
const OPTIONS = MANY_OPTIONS.slice(0, 5)
const OPTION_GROUPS = {
  'Group 1': [
    { value: '1', text: 'Option 1' },
    { value: '2', text: 'Option 2' },
    { value: '3', text: 'Option 3' }
  ],
  'Group 2': [
    { value: '4', text: 'Option 4' },
    { value: '5', text: 'Option 5' },
    { value: '6', text: 'Option 6' },
    { value: '7', text: 'Option 7' }
  ],
  'Group 3': [
    { value: '8', text: 'Option 8' },
    { value: '9', text: 'Option 9' },
    { value: '10', text: 'Option 10' }
  ]
}

const getOptionQuerySelector = (value: string | number) =>
  `[role="option"][value="${value}"]`

const getOption = (value: string | number) =>
  cy.get(getOptionQuerySelector(value))

const getNativeOption = (value: string | number) =>
  cy.get(`option[value="${value}"]`)

const openSelect = () => {
  cy.get('[data-testid="select"]').click()
}

const pressArrowDown = () => {
  cy.get('[data-testid="select"]').trigger('keydown', {
    key: 'ArrowDown',
    keyCode: 40
  })
}

const pressEnter = () => {
  cy.get('[data-testid="select"]').trigger('keydown', {
    key: 'Enter',
    keyCode: 13
  })
}

const getNativeSelect = () => cy.get('select')

// eslint-disable-next-line max-lines-per-function
describe('Select', () => {
  it('renders', () => {
    mount(
      <TestingPicasso>
        <TestSelect />
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  it('renders open', () => {
    mount(
      <TestingPicasso>
        <TestSelect />
      </TestingPicasso>
    )

    openSelect()

    cy.get('body').happoScreenshot()
  })

  it('reveals partially visible option when it is hovered', () => {
    mount(
      <TestingPicasso>
        <TestSelect options={MANY_OPTIONS} />
      </TestingPicasso>
    )

    openSelect()

    // cy.get & cy.trigger scroll to the element so custom scrolling behaviour can't be tested
    // using window to avoid cypress auto scrolling

    // eslint-disable-next-line promise/catch-or-return
    cy.window().then(window => {
      // select the last visible option in the list
      // which is half hidden by the scroll
      const lastHalfVisibleOption = window.document.querySelector(
        getOptionQuerySelector(8)
      )
      const mouseOverEvent = new MouseEvent('mouseover', {
        view: window,
        bubbles: true,
        cancelable: true
      })

      // when you hover this last partially shown option
      lastHalfVisibleOption?.dispatchEvent(mouseOverEvent)

      // the options list should slightly scroll to show the hovered option
      return cy.get('body').happoScreenshot()
    })
  })

  it('renders disabled', () => {
    mount(
      <TestingPicasso>
        <TestSelect disabled />
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  it('renders with value', () => {
    mount(
      <TestingPicasso>
        <TestSelect value={OPTIONS[0].value} />
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  it('renders with error', () => {
    mount(
      <TestingPicasso>
        <TestSelect error />
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  it('renders in different width modes', () => {
    mount(
      <TestingPicasso>
        <TestSelect width='full' />
        <TestSelect placeholder='ID' width='shrink' />
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  it('renders loading', () => {
    mount(
      <TestingPicasso>
        <TestSelect loading />
      </TestingPicasso>
    )

    openSelect()

    cy.get('body').happoScreenshot()
  })

  it('renders loading in native mode', () => {
    mount(
      <TestingPicasso>
        <TestSelect native loading />
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  it('renders with custom menu width', () => {
    mount(
      <TestingPicasso>
        <TestSelect placeholder='ID' width='shrink' menuWidth='200px' />
      </TestingPicasso>
    )

    openSelect()

    cy.get('body').happoScreenshot()
  })

  it('renders reset button', () => {
    mount(
      <TestingPicasso>
        <TestSelect enableReset value={OPTIONS[0].value} testIds={testIds} />
      </TestingPicasso>
    )

    // Cypress does not go well with :hover CSS selectors
    // It can fire mouse events via JS, but can't simulate browser cursor behaviour
    // To fix this issue we're using a force method to show the button so the screenshot is correct
    cy.get(`[data-testid="${testIds.resetButton}"]`).invoke(
      'attr',
      'style',
      'visibility: visible'
    )

    cy.get('body').happoScreenshot()
  })

  it('renders in small size', () => {
    mount(
      <TestingPicasso>
        <TestSelect size='small' />
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  it('renders options with description', () => {
    mount(
      <TestingPicasso>
        <TestSelect
          options={OPTIONS.map(option => ({
            ...option,
            description: `Description ${option.value}`
          }))}
        />
      </TestingPicasso>
    )

    openSelect()

    cy.get('body').happoScreenshot()
  })

  it('renders with icon', () => {
    mount(
      <TestingPicasso>
        <TestSelect icon={<Settings16 />} />
        <TestSelect iconPosition='end' icon={<Settings16 />} />
        <TestSelect icon={<Settings16 />} disabled />
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  it('renders select with search', () => {
    mount(
      <TestingPicasso>
        <TestSelect searchThreshold={-1} />
      </TestingPicasso>
    )

    openSelect()

    cy.get('body').happoScreenshot()
  })

  it('changes native select value', () => {
    mount(<SelectNativeExample />)

    getNativeSelect().should('be.visible')
    getNativeSelect().select('1')
    getNativeOption(1).should('have.attr', 'aria-selected').and('match', /true/)
  })

  it('sets background correctly to various select states', () => {
    mount(
      <TestingPicasso>
        <div style={{ background: palette.yellow.main }}>
          <TestSelect />
          <TestSelect native />
          <TestSelect error />
          <TestSelect native error />
        </div>
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  it('highlights grouped options via keys correctly', () => {
    mount(
      <TestingPicasso>
        <TestSelect options={OPTION_GROUPS} />
      </TestingPicasso>
    )

    openSelect()
    ;[...Array(6)].forEach(pressArrowDown)

    getOption(7).should('have.attr', 'data-highlighted').and('match', /true/)
  })

  it('picks an option from group via keys correctly', () => {
    mount(
      <TestingPicasso>
        <TestUncontrolledSelect options={OPTION_GROUPS} multiple />
      </TestingPicasso>
    )

    openSelect()
    ;[...Array(6)].forEach(pressArrowDown)
    pressEnter()
    getOption(7).should('have.attr', 'aria-selected').and('match', /true/)

    pressArrowDown()
    pressEnter()
    getOption(8).should('have.attr', 'aria-selected').and('match', /true/)
  })

  it('highlights limited options correctly', () => {
    mount(
      <TestingPicasso>
        <TestSelect options={OPTION_GROUPS} limit={1} />
      </TestingPicasso>
    )

    openSelect()
    pressArrowDown()

    getOption(4).should('have.attr', 'data-highlighted').and('match', /true/)
  })
})
