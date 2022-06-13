import React, { AnchorHTMLAttributes, useState } from 'react'
import { Form } from '@toptal/picasso-forms'
import { isSubstring, noop } from '@toptal/picasso/utils'
import {
  AutocompleteItem,
  Container,
  Link,
  TagProps,
  TagSelector,
  TagSelectorProps,
  Typography,
} from '@toptal/picasso'

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = (item: AutocompleteItem | null) =>
  (item && item.text) || EMPTY_INPUT_VALUE

const filterOptions = (value: string) =>
  value !== ''
    ? basicOptions.filter(option => isSubstring(value, getDisplayValue(option)))
    : basicOptions

const TagSelectorExample = ({
  showOtherOption,
  ...props
}: Partial<TagSelectorProps>) => {
  const [filteredOptions, setFilteredOptions] = useState<
    AutocompleteItem[] | null | undefined
  >(basicOptions)
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
    <TestingPicasso>
      <Container padded='medium'>
        <TagSelector
          {...props}
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
    </TestingPicasso>
  )
}

const InitiallySelectedOptionExample = () => {
  const initialValues = {
    options: [basicOptions[1]],
  }

  return (
    <Form onSubmit={noop} initialValues={initialValues}>
      <>
        <Form.TagSelector name='options' options={basicOptions} />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </>
    </Form>
  )
}

const LinkTag = (props: TagProps & AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <TagSelector.Label as={Link} {...props} />
)

const getCountryDisplayValue = (item: AutocompleteItem | null) =>
  (item && (item as Country).country) || EMPTY_INPUT_VALUE
const filterCountryOptions = (value: string) =>
  value !== ''
    ? countryOptions.filter(option =>
        isSubstring(value, getCountryDisplayValue(option))
      )
    : countryOptions

const TagSelectorCustomLabelOptionRendererExample = () => {
  const [options, setOptions] = useState(countryOptions)
  const [value, setValue] = useState<Country[]>([])
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)

  return <TagSelector
        options={options}
        placeholder='Start typing...'
        value={value}
        inputValue={inputValue}
        getKey={(item: AutocompleteItem) => (item as Country).code}
        getDisplayValue={getCountryDisplayValue}
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
              {option.country}
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
          setOptions(filterCountryOptions(newInputValue))
        }}
      />
}

const COMPONENT_NAME = 'TagSelector'

describe('TagSelector', () => {
  it('renders', () => {
    mount(<TagSelectorExample />)

    cy.getByRole('combobox')
      .as('combobox-input')
      .realClick()
      .get('body')
      .happoScreenshot({
        component: COMPONENT_NAME,
        variant: 'default/after-clicked-combobox',
      })

    cy.get('@combobox-input')
      .type('{downArrow}')
      .type('{enter}')
      .get('body')
      .happoScreenshot({
        component: COMPONENT_NAME,
        variant: 'default/after-selected-item',
      })

    cy.get('[aria-label="delete icon"]')
      .realClick()
      .get('body')
      .happoScreenshot({
        component: COMPONENT_NAME,
        variant: 'default/after-deleted-item',
      })

    cy.get('@combobox-input').type('test').get('body').happoScreenshot({
      component: COMPONENT_NAME,
      variant: 'default/after-forced-no-result',
    })
  })

  it('renders other option when no result found', () => {
    mount(<TagSelectorExample showOtherOption />)

    cy.getByRole('combobox').as('combobox-input').realClick()
    cy.get('@combobox-input').type('test').get('body').happoScreenshot({
      component: COMPONENT_NAME,
      variant: 'other-option/after-forced-other-option',
    })

    cy.get('[role=option]').realClick().get('body').happoScreenshot({
      component: COMPONENT_NAME,
      variant: 'other-option/after-clicked-new-option',
    })
  })

  it('filters options correctly in a form', () => {
    cy.mount(<InitiallySelectedOptionExample />)

    cy.get('input[type="text"]').click()
    cy.get('[role=option]').as('options').should('have.length', 3)
    cy.get('@options').contains('Option 2').should('not.exist')

    cy.get('@options').contains('Option 1').click()
    cy.get('input[type="text"]').click()
    cy.get('@options').should('have.length', 2)
    cy.get('@options').contains('Option 1').should('not.exist')
  })

  it('renders custom label and custom option', () => {
    mount(<TagSelectorCustomLabelOptionRendererExample />)

    cy.getByRole('combobox')
      .as('combobox-input')
      .realClick()
      .get('body')
      .happoScreenshot({
        component: COMPONENT_NAME,
        variant: 'custom-label-custom-option/after-clicked-combobox',
      })

    cy.get('@combobox-input')
      .type('{downArrow}')
      .type('{downArrow}')
      .type('{enter}')
      .get('body')
      .happoScreenshot({
        component: COMPONENT_NAME,
        variant: 'custom-label-custom-option/after-selected-item',
      })
  })

  describe('when in a valid state', () => {
    it('shows valid icon', () => {
      cy.mount(<TagSelectorExample status='success' options={countryOptions} />)

      cy.get('body').happoScreenshot({
        component: COMPONENT_NAME,
        variant: 'show-valid-icon',
      })
    })
  })
})

const basicOptions = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

interface Country extends AutocompleteItem {
  country: string
  capital: string
  code: string
  required?: boolean
  href?: string
}

const countryOptions: Country[] = [
  {
    country: 'Belarus',
    capital: 'Minsk',
    code: 'BE',
    required: true,
    href: 'https://en.wikipedia.org/wiki/Belarus',
  },
  {
    country: 'Croatia',
    capital: 'Zagreb',
    code: 'HR',
    href: 'https://en.wikipedia.org/wiki/Croatia',
  },
  {
    country: 'Lithuania',
    capital: 'Vilnius',
    code: 'LU',
    href: 'https://en.wikipedia.org/wiki/Lithuania',
    required: true,
  },
  {
    country: 'Slovakia',
    capital: 'Bratislava',
    code: 'SK',
    href: 'https://en.wikipedia.org/wiki/Slovakia',
  },
  {
    country: 'Ukraine',
    capital: 'Kyiv',
    code: 'UA',
    href: 'https://en.wikipedia.org/wiki/Ukraine',
  },
]
