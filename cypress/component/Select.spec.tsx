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
  menuWidth
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
  />
)

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

const getOptions = (count: number) =>
  Array(count)
    .fill(0)
    .map((_, index) => ({
      value: (index + 1).toString(),
      text: `Option ${index + 1}`
    }))

const OPTIONS = getOptions(5)

const getOption = (value: string | number) =>
  cy.get(`[role="option"][value="${value}"]`)

const openSelect = () => {
  cy.get('[data-testid="select"]').click()
}

const getNativeSelect = () => cy.get('select')

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

  it('scrolls to option when it is hovered', () => {
    mount(
      <TestingPicasso>
        <TestSelect options={getOptions(20)} />
      </TestingPicasso>
    )

    openSelect()

    const partiallyVisibleOption = getOption(8)

    partiallyVisibleOption.trigger('mouseover')

    // Option #8 should be fully visible
    cy.get('body').happoScreenshot()
  })

  it('scrolls to option when it is hovered with native JS', () => {
    mount(
      <TestingPicasso>
        <TestSelect options={getOptions(10)} />
      </TestingPicasso>
    )

    openSelect()

    // eslint-disable-next-line
    cy.window().then(window => {
      const partiallyVisibleOption = window.document.querySelector(
        '[role="option"][value="8"]'
      )
      const mouseOverEvent = new MouseEvent('mouseover', {
        view: window,
        bubbles: true,
        cancelable: true
      })

      partiallyVisibleOption?.dispatchEvent(mouseOverEvent)

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
        <TestSelect enableReset value={OPTIONS[0].value} />
      </TestingPicasso>
    )

    // Cypress does not go well with :hover CSS selectors
    // It can fire mouse events via JS, but can't simulate browser cursor behaviour
    // To fix this issue we're using a force method to show the button so the screenshot is correct
    cy.get('[data-testid="reset-adornment"]').invoke(
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
    getOption(1).should('have.attr', 'aria-selected').and('match', /true/)
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
})
