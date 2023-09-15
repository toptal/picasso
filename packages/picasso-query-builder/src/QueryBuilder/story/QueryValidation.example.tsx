import React, { useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import { Typography } from '@toptal/picasso'

const initialQuery = {
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
  { name: 'age', label: 'Age', inputType: 'number' },
  { name: 'height', label: 'Height', inputType: 'number' },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)
  const [isValid, setIsValid] = useState<boolean>(false)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  const handleValidationChange = (valid: boolean) => {
    setIsValid(valid)
  }

  const customValidator = (input: RuleGroupTypeAny) => {
    if (!input.rules.length) {
      return false
    }

    return true
  }

  return (
    <>
      <QueryBuilder
        query={query}
        fields={fields}
        onQueryChange={handleQueryChange}
        onValidationChange={handleValidationChange}
        customValidator={customValidator}
      />
      <Typography>Is query valid: {isValid.toString()}</Typography>
    </>
  )
}

export default Example
