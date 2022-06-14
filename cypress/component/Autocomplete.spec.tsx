import React, { useCallback, useState } from 'react'
import debounce from 'debounce'
import {
  Autocomplete,
  AutocompleteProps,
  Globe16,
  Check16,
} from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso/utils'

const MIN_CHARS_TO_LOAD = 2

const OPTIONS = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Finland' },
  { text: 'Lithuania' },
  { text: 'Micronesia' },
  { text: 'Moldova' },
  { text: 'Monaco' },
  { text: 'Mongolia' },
  { text: 'Norway' },
  { text: 'Slovakia' },
  { text: 'Spain' },
  { text: 'Sweden' },
  { text: 'Switzerland' },
  { text: 'Ukraine' },
]

const filterOptions = (inputValue: string) =>
  OPTIONS.filter((option: { text: string }) =>
    isSubstring(inputValue, option.text)
  )

const loadOptions = (inputValue: string) =>
  new Promise<typeof OPTIONS>(resolve => {
    setTimeout(() => resolve(filterOptions(inputValue)), 1000)
  })

export const StaticOptionsAutocompleteExample = () => {
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<typeof OPTIONS>([])

  return (
    <Autocomplete
      onSelect={item => {
        setValue(item?.text ?? '')
      }}
      onChange={newValue => {
        setOptions(filterOptions(newValue))
        setValue(newValue)
      }}
      value={value}
      options={options}
      placeholder='Start typing Mongolia...'
      testIds={testIds}
    />
  )
}

export const DynamicOptionsAutocompleteExample = () => {
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<typeof OPTIONS>([])
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeDebounced = useCallback(
    debounce(async (newValue: string) => {
      const newOptions = await loadOptions(newValue.trim().toLowerCase())

      setLoading(false)
      setOptions(newOptions)
    }, 500),
    []
  )

  const handleChange = (
    inputValue: string,
    changedOptions: { isSelected: boolean }
  ) => {
    setValue(inputValue)

    if (changedOptions.isSelected) {
      return
    }

    if (inputValue.length >= MIN_CHARS_TO_LOAD) {
      setLoading(true)
      handleChangeDebounced(inputValue)
    } else {
      setLoading(false)
      setOptions([])
      handleChangeDebounced.clear()
    }
  }

  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      options={options}
      loading={loading}
      placeholder='Start typing Mongolia...'
      testIds={testIds}
    />
  )
}

const openAutocompleteWithTab = () => {
  cy.get('body').tab()
}

const testIds = {
  resetButton: 'reset-adornment',
  input: 'autocomplete',
}

const TestAutocomplete = (props: Partial<AutocompleteProps>) => (
  <Autocomplete value='' options={OPTIONS} testIds={testIds} {...props} />
)

describe('Autocomplete', () => {
  it('renders', () => {
    cy.mount(<TestAutocomplete />)

    cy.get('body').happoScreenshot()
  })

  it('renders a list of options when clicked', () => {
    cy.mount(<TestAutocomplete />)

    cy.getByTestId(testIds.input).click()
    cy.getByRole('menu').should('be.visible')

    cy.get('body').happoScreenshot()
  })

  it('renders a list of options with descriptions when clicked', () => {
    cy.mount(
      <TestAutocomplete
        options={[
          { text: 'Belarus', description: 'Population: 9.5M' },
          { text: 'Croatia', description: 'Population: 4M' },
          { text: 'Lithuania', description: 'Population: 3M' },
          { text: 'Slovakia', description: 'Population: 5.5M' },
          { text: 'Ukraine', description: 'Population: 42M' },
        ]}
      />
    )

    cy.getByTestId(testIds.input).click()
    cy.getByRole('menu').should('be.visible')

    cy.get('body').happoScreenshot()
  })

  it('renders disabled autocomplete', () => {
    cy.mount(
      <>
        <TestAutocomplete disabled />
        <TestAutocomplete value='Croatia' disabled />
      </>
    )

    cy.get('body').happoScreenshot()
  })

  it('renders a reset button', () => {
    cy.mount(<TestAutocomplete enableReset value='Croatia' testIds={testIds} />)

    // Cypress does not go well with :hover CSS selectors
    // It can fire mouse events via JS, but can't simulate browser cursor behaviour
    // To fix this issue we're using a force method to show the button so the screenshot is correct
    cy.getByTestId(testIds.resetButton).invoke(
      'attr',
      'style',
      'visibility: visible'
    )

    cy.get('body').happoScreenshot()
  })
  it('renders a placeholder', () => {
    cy.mount(<TestAutocomplete placeholder='Start a country...' />)
    cy.get('body').happoScreenshot()
  })

  it('renders the selected value even if a placeholder is specified', () => {
    cy.mount(
      <>
        <TestAutocomplete value='Croatia' />
        <TestAutocomplete value='Croatia' placeholder='Start a country...' />
      </>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders start and end adornments', () => {
    cy.mount(
      <>
        <TestAutocomplete startAdornment={<Globe16 />} />
        <TestAutocomplete endAdornment={<Globe16 />} />
        <TestAutocomplete
          startAdornment={<Globe16 />}
          endAdornment={<Globe16 />}
        />
      </>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders an icon unless a start adornment is specified', () => {
    cy.mount(
      <>
        <TestAutocomplete icon={<Check16 />} />
        <TestAutocomplete icon={<Check16 />} startAdornment={<Globe16 />} />
      </>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders loading and error states', () => {
    cy.mount(
      <>
        <TestAutocomplete status='error' />
        <TestAutocomplete loading />
        <TestAutocomplete value='Croatia' status='error' />
        <TestAutocomplete value='Croatia' loading />
      </>
    )

    // Wait for loading spinner to start animation
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100)

    cy.get('body').happoScreenshot()
  })

  it('renders in different widths', () => {
    cy.mount(
      <>
        <TestAutocomplete width='auto' />
        <TestAutocomplete width='full' />
        <TestAutocomplete width='shrink' />
      </>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders in different menu widths', () => {
    cy.mount(<TestAutocomplete menuWidth='200px' />)

    cy.getByTestId(testIds.input).click()
    cy.getByRole('menu').should('be.visible')

    cy.get('body').happoScreenshot()
  })

  it('renders other option', () => {
    cy.mount(<TestAutocomplete showOtherOption options={[]} value='picasso' />)

    cy.getByTestId(testIds.input).click()
    cy.getByRole('menu').should('be.visible')

    cy.get('body').happoScreenshot()
  })

  it('renders no options text', () => {
    cy.mount(
      <TestAutocomplete
        showOtherOption
        options={[]}
        noOptionsText='Nothing found'
        testIds={testIds}
      />
    )

    cy.getByTestId(testIds.input).click()
    cy.getByRole('menu').should('be.visible')

    cy.get('body').happoScreenshot()
  })

  it('renders powered by google', () => {
    cy.mount(
      <TestAutocomplete poweredByGoogle options={[{ text: 'Belarus' }]} />
    )

    cy.getByTestId(testIds.input).click()
    cy.getByRole('menu').should('be.visible')

    cy.get('body').happoScreenshot()
  })

  it('focuses Autocomplete with dynamic options should NOT open options list', () => {
    cy.mount(<DynamicOptionsAutocompleteExample />)

    openAutocompleteWithTab()

    cy.getByRole('menu').should('not.exist')

    cy.clock()
    cy.getByTestId(testIds.input).type('Mon')
    cy.tick(1500)
    cy.clock().invoke('restore')

    cy.getByRole('menu').should('be.visible')

    cy.getByTestId(testIds.input).blur()
    openAutocompleteWithTab()

    cy.getByRole('menu').should('not.exist')
  })

  it('focuses Autocomplete with static options should NOT open options list', () => {
    cy.mount(<StaticOptionsAutocompleteExample />)

    openAutocompleteWithTab()

    cy.getByRole('menu').should('not.exist')

    cy.getByTestId(testIds.input).type('Ukr')
    cy.getByRole('menu').should('be.visible')

    cy.getByTestId(testIds.input).blur()
    openAutocompleteWithTab()

    cy.getByRole('menu').should('not.exist')
  })
})
