import React, { useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import { Container } from '@toptal/picasso-container'
import { Loader } from '@toptal/picasso-loader'

const initialQuery: RuleGroupTypeAny = {
  rules: [
    {
      field: 'name',
      operator: '=',
      valueSource: 'value',
      value: 'John',
    },
    {
      field: 'age',
      operator: '=',
      valueSource: 'value',
      value: '12',
    },
  ],
  combinator: 'and',
}

const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  const renderTotalCount = ({
    totalCountLoading,
    totalCount,
  }: {
    totalCountLoading: boolean
    totalCount: number
  }) => {
    if (totalCountLoading) {
      return (
        <Container left='small'>
          <Loader size='small' variant='inherit' />
        </Container>
      )
    }

    return totalCount !== undefined && `(${totalCount})`
  }

  return (
    <QueryBuilder
      fields={fields}
      query={query}
      onQueryChange={handleQueryChange}
      runQueryChildren={
        <>
          Custom Text{' '}
          {renderTotalCount({ totalCount: 15, totalCountLoading: false })}
        </>
      }
    />
  )
}

export default Example
