import React, { useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import { Button, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-provider'

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
      value: '21',
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

  return (
    <QueryBuilder
      fields={fields}
      query={query}
      onQueryChange={handleQueryChange}
      hideControls
      padded={SPACING_6}
      footer={
        <Container flex justifyContent='space-between'>
          <Button variant='secondary'>Copy url</Button>
          <Container flex justifyContent='flex-end'>
            <Button variant='secondary'>Clear query</Button>
            <Button size='medium' variant='positive'>
              Run query
            </Button>
          </Container>
        </Container>
      }
    />
  )
}

export default Example
