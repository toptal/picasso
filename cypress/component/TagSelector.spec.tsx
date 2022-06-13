import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { noop } from '@toptal/picasso/utils'
import {
  AutocompleteItem,
  TagSelector,
  TagSelectorProps,
} from '@toptal/picasso'

const options = [
  {
    text: 'Option 1',
    value: 1,
  },
  {
    text: 'Option 2',
    value: 2,
  },
  {
    text: 'Option 3',
    value: 3,
  },
] as AutocompleteItem[]

const InitiallySelectedOptionExample = () => {
  const initialValues = {
    options: [
      {
        text: 'Option 2',
        value: 2,
      },
    ],
  }

  return (
    <Form onSubmit={noop} initialValues={initialValues}>
      <>
        <Form.TagSelector name='options' options={options} />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </>
    </Form>
  )
}

const NoOptionSelectedExample = ({ status }: Partial<TagSelectorProps>) => {
  return <TagSelector status={status} testIds={{ validIcon: 'valid-icon' }} />
}

const getOptions = () => cy.get('[role=option]')
const getOption = (text: string) => getOptions().contains(text)
const openTagSelector = () => cy.get('input[type="text"]').click()

describe('TagSelector', () => {
  it('filters options correctly in a form', () => {
    cy.mount(<InitiallySelectedOptionExample />)

    openTagSelector()
    getOptions().should('have.length', 2)
    getOption('Option 2').should('not.exist')

    getOption('Option 1').click()
    openTagSelector()
    getOptions().should('have.length', 1)
    getOption('Option 1').should('not.exist')
  })

  describe('when in a valid state', () => {
    it('shows valid icon', () => {
      cy.mount(<NoOptionSelectedExample status='success' />)

      cy.get('body').happoScreenshot()
    })
  })
})
