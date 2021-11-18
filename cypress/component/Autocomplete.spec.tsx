import React, { useCallback, useState } from 'react'
import { mount } from '@cypress/react'
import debounce from 'debounce'
import {
  Autocomplete,
  AutocompleteProps,
  Globe16,
  Check16
} from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'
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
  { text: 'Ukraine' }
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
    <TestingPicasso>
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
        data-testid='autocomplete'
      />
    </TestingPicasso>
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
    <TestingPicasso>
      <Autocomplete
        value={value}
        onChange={handleChange}
        options={options}
        loading={loading}
        placeholder='Start typing Mongolia...'
        data-testid='autocomplete'
      />
    </TestingPicasso>
  )
}

const openAutocompleteWithTab = () => {
  cy.get('body').tab()
}

const TestAutocomplete = (props: Partial<AutocompleteProps>) => (
  <Autocomplete
    data-testid='autocomplete'
    value=''
    options={OPTIONS}
    {...props}
  />
)

describe('Autocomplete', () => {
  it('renders', () => {
    mount(
      <TestingPicasso>
        <TestAutocomplete />
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  // TODO: https://toptal-core.atlassian.net/browse/FX-2273
  it.skip('renders a list of options when clicked', () => {
    mount(
      <TestingPicasso>
        <TestAutocomplete />
      </TestingPicasso>
    )

    cy.get('[data-testid=autocomplete]').click()

    cy.get('body').happoScreenshot()
  })

  // TODO: https://toptal-core.atlassian.net/browse/FX-2273
  it('renders a list of options with descriptions when clicked', () => {
    mount(
      <TestingPicasso>
        <TestAutocomplete
          options={[
            { text: 'Belarus', description: 'Population: 9.5M' },
            { text: 'Croatia', description: 'Population: 4M' },
            { text: 'Lithuania', description: 'Population: 3M' },
            { text: 'Slovakia', description: 'Population: 5.5M' },
            { text: 'Ukraine', description: 'Population: 42M' }
          ]}
        />
      </TestingPicasso>
    )

    cy.get('[data-testid=autocomplete]').click()

    cy.get('body').happoScreenshot()
  })

  it('renders disabled autocomplete', () => {
    mount(
      <TestingPicasso>
        <TestAutocomplete disabled />
        <TestAutocomplete value='Croatia' disabled />
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  it('renders a reset button', () => {
    mount(
      <TestingPicasso>
        <TestAutocomplete enableReset value='Croatia' />
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
  it('renders a placeholder', () => {
    mount(
      <TestingPicasso>
        <TestAutocomplete placeholder='Start a country...' />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders the selected value even if a placeholder is specified', () => {
    mount(
      <TestingPicasso>
        <TestAutocomplete value='Croatia' />
        <TestAutocomplete value='Croatia' placeholder='Start a country...' />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders start and end adornments', () => {
    mount(
      <TestingPicasso>
        <TestAutocomplete startAdornment={<Globe16 />} />
        <TestAutocomplete endAdornment={<Globe16 />} />
        <TestAutocomplete
          startAdornment={<Globe16 />}
          endAdornment={<Globe16 />}
        />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders an icon unless a start adornment is specified', () => {
    mount(
      <TestingPicasso>
        <TestAutocomplete icon={<Check16 />} />
        <TestAutocomplete icon={<Check16 />} startAdornment={<Globe16 />} />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders loading and error states', () => {
    mount(
      <TestingPicasso>
        <TestAutocomplete error />
        <TestAutocomplete loading />
        <TestAutocomplete value='Croatia' error />
        <TestAutocomplete value='Croatia' loading />
      </TestingPicasso>
    )

    // Wait for loading spinner to start animation
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100)

    cy.get('body').happoScreenshot()
  })

  it('renders in different widths', () => {
    mount(
      <TestingPicasso>
        <TestAutocomplete width='auto' />
        <TestAutocomplete width='full' />
        <TestAutocomplete width='shrink' />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  // TODO: https://toptal-core.atlassian.net/browse/FX-2273
  it('renders in different menu widths', () => {
    mount(
      <TestingPicasso>
        <TestAutocomplete menuWidth='200px' />
      </TestingPicasso>
    )

    cy.get('[data-testid=autocomplete]').click()

    cy.get('body').happoScreenshot()
  })

  // TODO: https://toptal-core.atlassian.net/browse/FX-2273
  it.skip('renders other option', () => {
    mount(
      <TestingPicasso>
        <TestAutocomplete showOtherOption options={[]} value='picasso' />
      </TestingPicasso>
    )

    cy.get('[data-testid=autocomplete]').click()

    cy.get('body').happoScreenshot()
  })

  it('renders no options text', () => {
    mount(
      <TestingPicasso>
        <TestAutocomplete
          showOtherOption
          options={[]}
          noOptionsText='Nothing found'
        />
      </TestingPicasso>
    )

    cy.get('[data-testid=autocomplete]').click()

    cy.get('body').happoScreenshot()
  })

  it('renders powered by google', () => {
    mount(
      <TestingPicasso>
        <TestAutocomplete poweredByGoogle options={[{ text: 'Belarus' }]} />
      </TestingPicasso>
    )

    cy.get('[data-testid=autocomplete]').click()

    cy.get('body').happoScreenshot()
  })

  it('focuses Autocomplete with dynamic options should NOT open options list', () => {
    mount(<DynamicOptionsAutocompleteExample />)

    openAutocompleteWithTab()

    cy.get('[role=menu]').should('not.exist')

    cy.clock()
    cy.get('[data-testid=autocomplete]').type('Mon')
    cy.tick(1500)
    cy.clock().invoke('restore')

    cy.get('[role=menu]').should('be.visible')

    cy.get('[data-testid=autocomplete]').blur()
    openAutocompleteWithTab()

    cy.get('[role=menu]').should('not.exist')
  })

  it('focuses Autocomplete with static options should NOT open options list', () => {
    mount(<StaticOptionsAutocompleteExample />)

    openAutocompleteWithTab()

    cy.get('[role=menu]').should('not.exist')

    cy.get('[data-testid=autocomplete]').type('Ukr')
    cy.get('[role=menu]').should('be.visible')

    cy.get('[data-testid=autocomplete]').blur()
    openAutocompleteWithTab()

    cy.get('[role=menu]').should('not.exist')
  })
})
