import React, { useState, useCallback } from 'react'
import { mount } from '@cypress/react'
import debounce from 'debounce'
import { Autocomplete, AutocompleteProps, Globe16 } from '@toptal/picasso'
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

  const handleChangeDebounced = useCallback(
    debounce(async (inputValue: string) => {
      const newOptions = await loadOptions(inputValue.trim().toLowerCase())

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
  <Autocomplete value='' options={OPTIONS} {...props} />
)

describe('Autocomplete', () => {
  it('renders', () => {
    mount(
      <TestingPicasso>
        <TestAutocomplete />
        <TestAutocomplete error />
        <TestAutocomplete loading />
        <TestAutocomplete options={null} />
        <TestAutocomplete options={[]} />
        <TestAutocomplete value='Croatia' />
        <TestAutocomplete placeholder='Start typing Mongolia...' />
        <TestAutocomplete icon={<Globe16 />} />
        <TestAutocomplete startAdornment={<Globe16 />} />
        <TestAutocomplete endAdornment={<Globe16 />} />
        <TestAutocomplete width='full' />
        <TestAutocomplete width='shrink' />
        <TestAutocomplete menuWidth='200px' />
      </TestingPicasso>
    )

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
