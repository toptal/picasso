import React, { useState, ChangeEvent } from 'react'
import {
  Select,
  SelectValueType,
  Form,
  Container,
  SelectProps,
  Settings16,
  Drawer,
} from '@toptal/picasso'
import { noop, palette } from '@toptal/picasso/utils'

const TestSelect = ({
  onChange = noop,
  value = undefined,
  multiple = false,
  options = OPTIONS,
  placeholder = 'Choose an option...',
  width = 'auto',
  native = false,
  status,
  disabled = false,
  disablePortal,
  loading = false,
  enableReset = false,
  searchThreshold,
  iconPosition,
  icon,
  menuWidth,
  limit,
  testIds,
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
    status={status}
    disabled={disabled}
    disablePortal={disablePortal}
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
  const [value, setValue] = useState<SelectValueType | SelectValueType[]>()

  const handleChange = (
    event: ChangeEvent<{
      name?: string
      value: SelectValueType | SelectValueType[]
    }>
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
  { value: '10', text: 'Option 10' },
]
const OPTIONS = MANY_OPTIONS.slice(0, 5)
const OPTION_GROUPS = {
  'Group 1': [
    { value: '1', text: 'Option 1' },
    { value: '2', text: 'Option 2' },
    { value: '3', text: 'Option 3' },
  ],
  'Group 2': [
    { value: '4', text: 'Option 4' },
    { value: '5', text: 'Option 5' },
    { value: '6', text: 'Option 6' },
    { value: '7', text: 'Option 7' },
  ],
  'Group 3': [
    { value: '8', text: 'Option 8' },
    { value: '9', text: 'Option 9' },
    { value: '10', text: 'Option 10' },
  ],
}

const getOptionQuerySelector = (value: string | number) =>
  `[role="option"][value="${value}"]`

const getOption = (value: string | number) =>
  cy.get(getOptionQuerySelector(value))

const getNativeOption = (value: string | number) =>
  cy.get(`option[value="${value}"]`)

const openSelect = () => {
  cy.getByTestId('select').click()
}

const pressArrowDown = () => {
  cy.getByTestId('select').trigger('keydown', {
    key: 'ArrowDown',
    keyCode: 40,
  })
}

const pressEnter = () => {
  cy.getByTestId('select').trigger('keydown', {
    key: 'Enter',
    keyCode: 13,
  })
}

const getNativeSelect = () => cy.get('select')

const component = 'Select'

/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
describe('Select', () => {
  it('renders', () => {
    cy.mount(<TestSelect />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'default',
    })
  })

  it('renders open', () => {
    cy.mount(<TestSelect />)

    openSelect()

    cy.get('body').happoScreenshot({
      component,
      variant: 'default/after-clicked',
    })
  })

  it('reveals partially visible option when it is hovered', () => {
    cy.mount(<TestSelect options={MANY_OPTIONS} />)

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
        cancelable: true,
      })

      // when you hover this last partially shown option
      lastHalfVisibleOption?.dispatchEvent(mouseOverEvent)

      // the options list should slightly scroll to show the hovered option
      return cy.get('body').happoScreenshot({
        component,
        variant: 'default/after-hovered-partially-visible-last-option',
      })
    })
  })

  it('renders disabled', () => {
    cy.mount(<TestSelect disabled />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'disabled',
    })
  })

  it('renders with value', () => {
    cy.mount(<TestSelect value={OPTIONS[0].value} />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'default/after-selected',
    })
  })

  it('renders with error', () => {
    cy.mount(<TestSelect status='error' />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'error',
    })
  })

  it('renders in different width modes', () => {
    cy.mount(
      <>
        <TestSelect width='full' />
        <TestSelect placeholder='ID' width='shrink' />
      </>
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'different-widths',
    })
  })

  it('renders loading', () => {
    cy.mount(<TestSelect loading />)

    openSelect()

    cy.get('body').happoScreenshot({
      component,
      variant: 'loading',
    })
  })

  it('renders loading in native mode', () => {
    cy.mount(<TestSelect native loading />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'native-loading',
    })
  })

  it('renders with custom menu width', () => {
    cy.mount(<TestSelect placeholder='ID' width='shrink' menuWidth='200px' />)

    openSelect()

    cy.get('body').happoScreenshot({
      component,
      variant: 'custom-menu-width',
    })
  })

  it('renders reset button', () => {
    const testIds = { resetButton: 'reset-adornment' }

    cy.mount(
      <TestSelect enableReset value={OPTIONS[0].value} testIds={testIds} />
    )

    // Cypress does not go well with :hover CSS selectors
    // It can fire mouse events via JS, but can't simulate browser cursor behaviour
    // To fix this issue we're using a force method to show the button so the screenshot is correct
    cy.getByTestId(testIds.resetButton).invoke(
      'attr',
      'style',
      'visibility: visible'
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'with-reset-button',
    })
  })

  it('renders in small size', () => {
    cy.mount(<TestSelect size='small' />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'size/small',
    })
  })

  it('renders options with description', () => {
    cy.mount(
      <TestSelect
        options={OPTIONS.map(option => ({
          ...option,
          description: `Description ${option.value}`,
        }))}
      />
    )

    openSelect()

    cy.get('body').happoScreenshot({
      component,
      variant: 'options-with-description',
    })
  })

  it('renders with icon', () => {
    cy.mount(
      <>
        <TestSelect icon={<Settings16 />} />
        <TestSelect iconPosition='end' icon={<Settings16 />} />
        <TestSelect icon={<Settings16 />} disabled />
      </>
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'with-icon',
    })
  })

  it('changes native select value', () => {
    cy.mount(<SelectNativeExample />)

    getNativeSelect().should('be.visible')
    getNativeSelect().select('1')
    getNativeOption(1).should('have.attr', 'aria-selected').and('match', /true/)
  })

  it('sets background correctly to various select states', () => {
    cy.mount(
      <>
        <div style={{ background: palette.yellow.main }}>
          <TestSelect />
          <TestSelect native />
          <TestSelect status='error' />
          <TestSelect native status='error' />
        </div>
      </>
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'various-states',
    })
  })

  it('highlights grouped options via keys correctly', () => {
    cy.mount(<TestSelect options={OPTION_GROUPS} />)

    openSelect()
    ;[...Array(6)].forEach(pressArrowDown)

    getOption(7).should('have.attr', 'data-highlighted').and('match', /true/)
  })

  it('picks an option from group via keys correctly', () => {
    cy.mount(<TestUncontrolledSelect options={OPTION_GROUPS} multiple />)

    openSelect()
    ;[...Array(6)].forEach(pressArrowDown)
    pressEnter()
    getOption(7).should('have.attr', 'aria-selected').and('match', /true/)

    pressArrowDown()
    pressEnter()
    getOption(8).should('have.attr', 'aria-selected').and('match', /true/)
  })

  it('highlights limited options correctly', () => {
    cy.mount(<TestSelect options={OPTION_GROUPS} limit={1} />)

    openSelect()
    pressArrowDown()

    getOption(4).should('have.attr', 'data-highlighted').and('match', /true/)
  })

  describe('when rendered in Drawer with search behaviour', () => {
    it('is possible to focus the search input by click', () => {
      cy.mount(
        <Drawer open>
          <Form>
            <Form.Field>
              <TestSelect searchThreshold={-1} disablePortal />
            </Form.Field>
          </Form>
        </Drawer>
      )

      openSelect()

      cy.get('[role="tooltip"]').find('input').as('searchInput')

      cy.get('@searchInput').should('be.visible')
      cy.get('@searchInput').click().should('have.focus')
    })
  })

  describe('with search input', () => {
    it('focuses the input', () => {
      cy.mount(
        <TestSelect
          searchThreshold={-1}
          testIds={{ searchInput: 'search-input' }}
        />
      )

      cy.getByTestId('select').click().find('input').should('be.focused')

      cy.get('body').happoScreenshot({
        component,
        variant: 'with-search-input',
      })

      // focuses on the Search input by clicking on the input
      cy.getByTestId('search-input')
        .click('center')
        .find('input')
        .should('be.focused')

      // focuses on by click on the input wrapper
      cy.getByTestId('select')
        .click()
        .getByTestId('search-input')
        .click('bottom')
        .find('input')
        .should('be.focused')

      // focuses on by click on the search icon
      cy.getByTestId('select')
        .click()
        .getByTestId('search-input')
        .closest('[role="menuitem"]')
        .click(20, 20)
        .find('input')
        .should('be.focused')

      // focuses on by typing
      cy.getByTestId('select').click().type('option')
      cy.getByTestId('search-input').find('input').should('be.focused')
    })
  })
})
