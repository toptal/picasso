import React, { useState } from 'react'
import { QueryBuilder } from '@toptal/picasso-query-builder'
import type {
  RuleGroupTypeAny,
  RuleType,
  ValidationResult,
  Field,
} from '@toptal/picasso-query-builder'
import { Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso-notification'

const submitSuccessMessage = 'Successfully submitted'
const firstNameValidationMessage = 'First Name is required'
const lastNameValidationMessage = 'Last Name is required'

const checkName = (rule: RuleType): ValidationResult | boolean => {
  return (
    !!rule.value || {
      reasons: [`${firstNameValidationMessage}`],
      valid: false,
    }
  )
}

const checkLastName = (rule: RuleType): ValidationResult | boolean => {
  return (
    !!rule.value || {
      reasons: [`${lastNameValidationMessage}`],
      valid: false,
    }
  )
}

const fields: Field[] = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter first name',
    inputType: 'text',
    validator: checkName,
  },
  {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter last name',
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
  addGroupButton: 'add-group-button',
  cloneGroupButton: 'clone-group-button',
  removeGroupButton: 'remove-group-button',
  controls: 'query-builder-controls',
  valueEditor: 'value-editor',
  fieldSelector: 'field-selector',
}

type ExampleProps = {
  maxGroupDepth?: number
}

const component = 'QueryBuilder'

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

const getSubmitButton = () =>
  cy.get('button').contains('Confirm').closest('button')

describe('QueryBuilder', () => {
  describe('when the query builder is ready to be submitted', () => {
    it('submits Query Builder with success result', () => {
      cy.mount(<QueryBuilderExample />)

      cy.getByTestId(testIds.addRuleButton).click()
      cy.getByTestId(testIds.valueEditor).type('firstname')
      cy.getByTestId(testIds.runQueryButton).click()

      cy.getByRole('alert')
        .should('be.visible')
        .and('contain', submitSuccessMessage)

      cy.get('body').happoScreenshot({
        component,
        variant: 'submit-succcess',
      })
    })
  })

  describe('when query builder is not ready to be submitted', () => {
    it('shows validation error when top level query group is empty', () => {
      cy.mount(<QueryBuilderExample />)

      cy.getByTestId(testIds.runQueryButton).click()

      cy.getByRole('alert')
        .should('be.visible')
        .and('contain', "A group can't be empty")

      cy.get('body').happoScreenshot({
        component,
        variant: 'validation/error-empty-group',
      })
    })
  })

  describe('when query builder has custom validation checks for rules', () => {
    it('shows custom validation message for a single invalid rule', () => {
      cy.mount(<QueryBuilderExample />)

      cy.getByTestId(testIds.addRuleButton).click()
      cy.getByTestId(testIds.runQueryButton).click()

      cy.getByRole('alert')
        .should('be.visible')
        .and('contain', firstNameValidationMessage)

      cy.get('body').happoScreenshot({
        component,
        variant: 'validation/error-single-rule',
      })
    })

    it('shows custom validation message for multiple invalid rules', () => {
      cy.mount(<QueryBuilderExample />)

      cy.getByTestId(testIds.addRuleButton).as('addRuleButton')
      cy.get('@addRuleButton').click()
      cy.get('@addRuleButton').click()

      cy.getByTestId(testIds.fieldSelector).last().as('lastFieldSelector')

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
        .and('contain', firstNameValidationMessage)
        .and('contain', lastNameValidationMessage)

      cy.get('body').happoScreenshot({
        component,
        variant: 'validation/error-multiple-rules',
      })
    })
  })

  describe('when `maxGroupDepth` is not set', () => {
    it('allows a maximum of `3` level group depth by default', () => {
      cy.mount(<QueryBuilderExample />)

      cy.getByTestId(testIds.addGroupButton).click()

      getAddGroupButtonByDepth(1).click()
      getAddGroupButtonByDepth(2).click()
      getGroupByDepth(3).should('be.visible').and('exist')
      getAddGroupButtonByDepth(3).should('not.exist')

      cy.get('body').happoScreenshot({
        component,
        variant: 'max-depth/default',
      })
    })
  })

  describe('when `maxGroupDepth` is set', () => {
    it('prevents adding new rule groups more than `maxGroupDepth`', () => {
      cy.mount(<QueryBuilderExample maxGroupDepth={1} />)

      cy.getByTestId(testIds.addGroupButton).click()

      getGroupByDepth(1).should('be.visible').and('exist')
      getAddGroupButtonByDepth(1).should('not.exist')

      cy.get('body').happoScreenshot({
        component,
        variant: 'max-depth/pre-defined',
      })
    })
  })

  describe('when we manipulate query builder groups', () => {
    it('adds, clones and removes groups', () => {
      cy.mount(<QueryBuilderExample maxGroupDepth={4} />)

      cy.getByTestId(testIds.addGroupButton).click()

      cy.getByTestId(testIds.removeGroupButton).click()
      getSubmitButton().click()
      getGroupByDepth(1).should('not.exist')

      cy.getByTestId(testIds.addGroupButton).click()

      getAddGroupButtonByDepth(1).click()
      getAddGroupButtonByDepth(2).click()
      getAddGroupButtonByDepth(3).click()

      getGroupByDepth(1).should('be.visible').and('exist')
      getGroupByDepth(2).should('be.visible').and('exist')
      getGroupByDepth(3).should('be.visible').and('exist')
      getGroupByDepth(4).should('be.visible').and('exist')

      cy.getByTestId(testIds.cloneGroupButton).click()
      getGroupByDepth(1).should('be.visible').and('exist')
    })
  })
})
