import React, { useState } from 'react'
import { QueryBuilder } from '@toptal/picasso-query-builder'
import type {
  RuleGroupTypeAny,
  RuleType,
  ValidationResult,
} from '@toptal/picasso-query-builder'
import { Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const submitSuccessMessage = 'Successfully submitted'
const firstnameValidationMessage = 'Firstname is required'
const lastnameValidationMessage = 'Lastname is required'

const checkName = (rule: RuleType): ValidationResult | boolean => {
  return (
    !!rule.value || {
      reasons: [`${firstnameValidationMessage}`],
      valid: false,
    }
  )
}

const checkLastName = (rule: RuleType): ValidationResult | boolean => {
  return (
    !!rule.value || {
      reasons: [`${lastnameValidationMessage}`],
      valid: false,
    }
  )
}

const fields: Field[] = [
  {
    name: 'firstName',
    label: 'Firstname',
    placeholder: 'Enter firstname',
    inputType: 'text',
    validator: checkName,
  },
  {
    name: 'lastName',
    label: 'Lastname',
    placeholder: 'Enter lastname',
    defaultOperator: 'beginsWith',
    validator: checkLastName,
  },
]

const initialQuery = {
  rules: [],
  combinator: 'and',
}

const testIds = {
  runQueryButton: 'run-query-button',
  addRuleButton: 'add-rule-button',
  controls: 'query-builder-controls',
}

type ExampleProps = {
  maxGroupDepth?: number
}

const QueryBuilderExample = ({ maxGroupDepth }: ExampleProps) => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const { showSuccess } = useNotifications()

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  const handleSubmit = () => {
    showSuccess(submitSuccessMessage)
  }

  return (
    <Container style={{ maxWidth: '800px' }} padded='small'>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={handleQueryChange}
        onSubmit={handleSubmit}
        testIds={testIds}
        maxGroupDepth={maxGroupDepth}
      />
    </Container>
  )
}

const getGroupByDepth = (depth: number) =>
  cy.get(`.rule-group[data-level=${depth}]`)

const getAddGroupButtonByDepth = (depth: number) =>
  getGroupByDepth(depth).find('.rule-group-add-group')

describe('QueryBuilder', () => {
  describe('when the query builder is valid', () => {
    it('submits Query Builder with success result', () => {
      cy.mount(<QueryBuilderExample />)

      cy.getByTestId(testIds.addRuleButton).click()
      cy.getByTestId('value-editor').type('firstname')
      cy.getByTestId(testIds.runQueryButton).click()

      cy.getByRole('alert')
        .should('be.visible')
        .and('contain', submitSuccessMessage)
    })
  })

  describe('when query builder is not valid', () => {
    it('shows validation error when top level query group is empty', () => {
      cy.mount(<QueryBuilderExample />)

      cy.getByTestId(testIds.runQueryButton).click()

      cy.getByRole('alert')
        .should('be.visible')
        .and('contain', "A group can't be empty")
    })

    it('shows custom vaidation message for a single invalid rule', () => {
      cy.mount(<QueryBuilderExample />)

      cy.getByTestId(testIds.addRuleButton).click()
      cy.getByTestId(testIds.runQueryButton).click()

      cy.getByRole('alert')
        .should('be.visible')
        .and('contain', firstnameValidationMessage)
    })

    it('shows custom vaidation message for multiple invalid rules', () => {
      cy.mount(<QueryBuilderExample />)

      cy.getByTestId(testIds.addRuleButton).as('addRuleButton')
      cy.get('@addRuleButton').click()
      cy.get('@addRuleButton').click()

      cy.getByTestId('fields').last().as('lastFieldSelector')

      cy.get('@lastFieldSelector').click()

      cy.get('@lastFieldSelector').trigger('keydown', {
        key: 'ArrowDown',
        keyCode: 40,
      })

      cy.get('@lastFieldSelector').trigger('keydown', {
        key: 'Enter',
        keyCode: 13,
      })

      cy.getByTestId(testIds.runQueryButton).click()

      cy.getByRole('alert')
        .should('be.visible')
        .and('contain', firstnameValidationMessage)
        .and('contain', lastnameValidationMessage)
    })
  })

  describe('when `maxGroupDepth` is not set', () => {
    it('allows a maximum of `3` level group depth by default', () => {
      cy.mount(<QueryBuilderExample />)

      cy.getByTestId('add-group').click()

      getAddGroupButtonByDepth(1).click()
      getAddGroupButtonByDepth(2).click()
      getGroupByDepth(3).should('be.visible').and('exist')
      getAddGroupButtonByDepth(3).should('not.exist')
    })
  })

  describe('when `maxGroupDepth` is set', () => {
    it('prevents adding new rule groups more than `maxGroupDepth`', () => {
      cy.mount(<QueryBuilderExample maxGroupDepth={1} />)

      cy.getByTestId('add-group').click()

      getGroupByDepth(1).should('be.visible').and('exist')
      getAddGroupButtonByDepth(1).should('not.exist')
    })
  })
})
