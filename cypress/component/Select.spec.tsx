import React, { useState, ChangeEvent } from 'react'
import { mount } from '@cypress/react'
import { Select, Form, Container, NumberInput } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { palette } from '@toptal/picasso/utils'

const SelectSearchBehaviourExample = () => {
  const [value, setValue] = useState<string>()
  const [threshold, setTreshold] = useState(4)

  const handleChange = (
    event: ChangeEvent<{
      name?: string
      value: string
    }>
  ) => {
    setValue(event.target.value)
  }

  const handleThresholdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTreshold(parseInt(event.target.value, 10))
  }

  return (
    <TestingPicasso>
      <Container flex>
        <Container right='small'>
          <Form.Field>
            <Form.Label>Search for an option</Form.Label>
            <Select
              onChange={handleChange}
              value={value}
              options={OPTIONS}
              placeholder='Choose an option...'
              width='auto'
              searchThreshold={threshold}
              data-testid='select'
            />
          </Form.Field>
        </Container>
        <Container>
          <Form.Field>
            <Form.Label>Search threshold</Form.Label>
            <NumberInput
              value={threshold}
              onChange={handleThresholdChange}
              data-testid='input-threshold'
            />
          </Form.Field>
        </Container>
      </Container>
    </TestingPicasso>
  )
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

const SelectOverviewExample = () => (
  <TestingPicasso>
    <Container flex>
      <Form.Field>
        <Form.Label>Select</Form.Label>
        <Select options={OPTIONS} placeholder='Choose an option...' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Native elect</Form.Label>
        <Select options={OPTIONS} placeholder='Choose an option...' native />
      </Form.Field>
      <Form.Field>
        <Form.Label>Select with error</Form.Label>
        <Select options={OPTIONS} placeholder='Choose an option...' error />
      </Form.Field>
      <Form.Field>
        <Form.Label>Native elect with error</Form.Label>
        <Select
          options={OPTIONS}
          placeholder='Choose an option...'
          native
          error
        />
      </Form.Field>
    </Container>
  </TestingPicasso>
)

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
  { value: '5', text: 'Option 5' }
]

const openSelectWithTab = () => {
  cy.get('body').tab()
}

const setThresholdToHideSelectSearch = () => {
  cy.get('[data-testid=input-threshold]').type('{backspace}').type('6')
}

const getNativeSelect = () => cy.get('select')

describe('Select', () => {
  it('focuses Select with and without a search', () => {
    mount(<SelectSearchBehaviourExample />)

    openSelectWithTab()

    cy.get('[role=menu]').should('not.exist')

    setThresholdToHideSelectSearch()

    openSelectWithTab()
    cy.get('[role=menu]').should('not.exist')

    cy.get('[data-testid=select]').type(' ')
    cy.get('[role=menu]').should('be.visible')
    cy.get('[role=menu]').happoScreenshot()
  })

  it('changes NativeSelect value', () => {
    mount(<SelectNativeExample />)

    getNativeSelect().should('be.visible')
    getNativeSelect().select('1')
    cy.get('option[role=option][value=1]')
      .should('have.attr', 'aria-selected')
      .and('match', /true/)
  })

  it('renders as non-transparent on a colorful background', () => {
    mount(
      <div style={{ background: palette.yellow.main }}>
        <SelectOverviewExample />
      </div>
    )

    cy.get('body').happoScreenshot()
  })
})
