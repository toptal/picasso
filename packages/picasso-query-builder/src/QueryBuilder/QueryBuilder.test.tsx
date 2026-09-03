import React from 'react'
import { render, screen } from '@toptal/picasso-test-utils'
import type { RuleGroupType } from 'react-querybuilder'

import type { Field } from '../types/query-builder'
import QueryBuilder from './QueryBuilder'

// react-dnd ships untranspiled ESM that jest cannot parse; drag and drop
// behavior is covered by the DragDrop story and Happo instead
jest.mock('react-dnd', () => ({}))
jest.mock('react-dnd-html5-backend', () => ({}))
jest.mock('@react-querybuilder/dnd', () => ({
  QueryBuilderDnD: ({ children }: { children: React.ReactNode }) => children,
}))

const fields: Field[] = [
  { name: 'firstName', label: 'First Name' },
  { name: 'age', label: 'Age', inputType: 'number' },
]

const query: RuleGroupType = {
  combinator: 'and',
  rules: [{ field: 'firstName', operator: '=', value: '' }],
}

const renderComponent = (
  props: Partial<React.ComponentProps<typeof QueryBuilder>> = {}
) =>
  render(
    <QueryBuilder
      fields={fields}
      query={query}
      onQueryChange={jest.fn()}
      {...props}
    />
  )

describe('QueryBuilder', () => {
  it('renders the rule with field selector, combinator label and controls', () => {
    renderComponent()

    expect(screen.getByText('Query')).toBeInTheDocument()
    expect(screen.getByDisplayValue('First Name')).toBeInTheDocument()
    expect(screen.getByText('Run Query')).toBeInTheDocument()
    expect(screen.getByText('Clear Query')).toBeInTheDocument()
  })

  it('reports validity through onValidationChange', () => {
    const onValidationChange = jest.fn()

    renderComponent({ onValidationChange })

    expect(onValidationChange).toHaveBeenCalledWith(true)
  })
})
