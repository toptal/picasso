import type { AnchorHTMLAttributes } from 'react'
import React, { useState } from 'react'
import { Form } from '@toptal/picasso-forms'
import { isSubstring, noop } from '@toptal/picasso/utils'
import type {
  AutocompleteItem,
  TagProps,
  TagSelectorProps,
} from '@toptal/picasso'
import { Container, Link, TagSelector, Typography } from '@toptal/picasso'

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = (item: AutocompleteItem | null) =>
  (item && item.text) || EMPTY_INPUT_VALUE

const filterOptions = (value: string) =>
  value !== ''
    ? countryOptions.filter(option =>
        isSubstring(value, getDisplayValue(option))
      )
    : countryOptions

const TagSelectorExample = ({
  showOtherOption,
  ...props
}: Partial<TagSelectorProps>) => {
  const [filteredOptions, setFilteredOptions] = useState<
    AutocompleteItem[] | null | undefined
  >(countryOptions)
  const [value, setValue] = useState<AutocompleteItem[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleChange = (selectedValues: AutocompleteItem[]) => {
    setValue(selectedValues)
  }

  const handleInputChange = (newInputValue: string) => {
    setInputValue(newInputValue)
    setFilteredOptions(filterOptions(newInputValue))
  }

  const handleOtherOptionSelect = (newValue: string) => {
    setValue([...value, { value: newValue, text: newValue }])
  }

  return (
    <Container padded='medium'>
      <TagSelector
        {...props}
        placeholder='Start typing...'
        options={filteredOptions}
        getDisplayValue={getDisplayValue}
        value={value}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        showOtherOption={showOtherOption}
        onOtherOptionSelect={handleOtherOptionSelect}
      />
    </Container>
  )
}

const InitiallySelectedOptionExample = () => {
  const initialValues = {
    options: [countryOptions[1]],
  }

  return (
    <Container padded='medium'>
      <Form onSubmit={noop} initialValues={initialValues}>
        <Form.TagSelector
          name='options'
          options={countryOptions}
          getKey={item => item.code as string}
        />
      </Form>
    </Container>
  )
}

const LinkTag = (props: TagProps & AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <TagSelector.Label as={Link} {...props} />
)

const TagSelectorCustomLabelOptionRendererExample = () => {
  const [options, setOptions] = useState(countryOptions)
  const [value, setValue] = useState<Country[]>([])
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)

  return (
    <Container padded='medium'>
      <TagSelector
        options={options}
        placeholder='Start typing...'
        value={value}
        inputValue={inputValue}
        getKey={(item: AutocompleteItem) => (item as Country).code}
        getDisplayValue={getDisplayValue}
        renderLabel={({ item, displayValue, disabled, onDelete }) => {
          const { href, required } = item as Country

          return (
            <LinkTag
              disabled={disabled}
              onDelete={required ? undefined : onDelete}
              href={href}
            >
              {displayValue}
            </LinkTag>
          )
        }}
        renderOption={(option: Partial<Country>, index?: number) => (
          <Container>
            <Typography size='medium' weight='semibold'>
              {option.text}
            </Typography>
            <Typography size='inherit' style={{ fontSize: '12px' }}>
              {option.capital} ({index})
            </Typography>
          </Container>
        )}
        onChange={(selectedValues: AutocompleteItem[]) => {
          setValue(selectedValues as Country[])
        }}
        onInputChange={(newInputValue: string) => {
          setInputValue(newInputValue)
          setOptions(filterOptions(newInputValue))
        }}
      />
    </Container>
  )
}

const component = 'TagSelector'

describe('TagSelector', () => {
  it('renders', () => {
    cy.mount(<TagSelectorExample />)

    cy.getByRole('combobox')
      .as('combobox-input')
      .realClick()
      .get('body')
      .happoScreenshot({
        component,
        variant: 'default/after-clicked-combobox',
      })

    cy.get('@combobox-input').type('{downArrow}')
    cy.get('@combobox-input').type('{enter}')
    cy.get('body').happoScreenshot({
      component,
      variant: 'default/after-selected-item',
    })

    cy.get('[aria-label="delete icon"]')
      .realClick()
      .get('body')
      .happoScreenshot({
        component,
        variant: 'default/after-deleted-item',
      })

    cy.get('@combobox-input').type('not existing item text')
    cy.get('body').happoScreenshot({
      component,
      variant: 'default/after-forced-no-result',
    })
  })

  it('renders other option when no result found', () => {
    cy.mount(<TagSelectorExample showOtherOption />)

    cy.getByRole('combobox').as('combobox-input').realClick()
    cy.get('@combobox-input').type('not existing item text')
    cy.get('body').happoScreenshot({
      component,
      variant: 'other-option/after-forced-other-option',
    })

    cy.getByRole('option').realClick().get('body').happoScreenshot({
      component,
      variant: 'other-option/after-clicked-new-option',
    })
  })

  it('filters options correctly in a form', () => {
    cy.mount(<InitiallySelectedOptionExample />)

    cy.get('input[type="text"]').click()
    cy.getByRole('option').as('options').should('have.length', 4)
    cy.get('@options').contains('Croatia').should('not.exist')

    cy.get('@options').contains('Belarus').click()
    cy.get('input[type="text"]').click()
    cy.get('@options').should('have.length', 3)
    cy.get('@options').contains('Belarus').should('not.exist')
  })

  it('renders custom label and custom option', () => {
    cy.mount(<TagSelectorCustomLabelOptionRendererExample />)

    cy.getByRole('combobox')
      .as('combobox-input')
      .realClick()
      .get('body')
      .happoScreenshot({
        component,
        variant: 'custom-label-custom-option/after-clicked-combobox',
      })

    cy.get('@combobox-input').type('{downArrow}')
    cy.get('@combobox-input').type('{downArrow}')
    cy.get('@combobox-input').type('{enter}')

    cy.get('a').hoverAndTakeHappoScreenshot({
      component,
      variant: 'custom-label-custom-option/after-selected-and-hovered-item',
    })
  })
})

interface Country extends AutocompleteItem {
  text: string
  capital: string
  code: string
  required?: boolean
  href?: string
}

const countryOptions: Country[] = [
  {
    text: 'Belarus',
    capital: 'Minsk',
    code: 'BE',
    required: true,
    href: 'https://en.wikipedia.org/wiki/Belarus',
  },
  {
    text: 'Croatia',
    capital: 'Zagreb',
    code: 'HR',
    href: 'https://en.wikipedia.org/wiki/Croatia',
  },
  {
    text: 'Lithuania',
    capital: 'Vilnius',
    code: 'LU',
    href: 'https://en.wikipedia.org/wiki/Lithuania',
    required: true,
  },
  {
    text: 'Slovakia',
    capital: 'Bratislava',
    code: 'SK',
    href: 'https://en.wikipedia.org/wiki/Slovakia',
  },
  {
    text: 'Ukraine',
    capital: 'Kyiv',
    code: 'UA',
    href: 'https://en.wikipedia.org/wiki/Ukraine',
  },
]
