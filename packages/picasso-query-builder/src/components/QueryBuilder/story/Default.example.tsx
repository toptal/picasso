import React, { useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'

const emptyQueryBuilderQuery = {
  rules: [],
  combinator: 'and',
}

const fields = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter first name',
    inputType: 'text',
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(emptyQueryBuilderQuery)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  return (
    <QueryBuilder
      fields={fields}
      query={query}
      onQueryChange={handleQueryChange}
    />
  )
}

export default Example
