import React, { useEffect, useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'

type MultiSelectOptions = {
  label: string
  name: string
}

const defaultQuery = {
  rules: [],
  combinator: 'and',
}

const multiselectOptions = [
  {
    label: 'Digital Design',
    name: 'DIGITAL_DESIGN',
  },
  {
    label: 'UI',
    name: 'UI',
  },
  {
    label: 'Salesforce',
    name: 'SALESFORCE',
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(defaultQuery)
  const [loading, setLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<MultiSelectOptions[]>()

  useEffect(() => {
    const loadOptions = async () => {
      setLoading(true)
      const data = await new Promise<MultiSelectOptions[]>(resolve =>
        setTimeout(() => {
          resolve(multiselectOptions)
          setLoading(false)
        }, 1000)
      )

      setOptions(data)
    }

    loadOptions()
  }, [])

  const fields = [
    {
      name: 'Multiselect',
      label: 'Multiselect',
      valueEditorType: 'multiselect' as const,
      values: options,
      loading: loading,
    },
  ]

  const handleChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  return (
    <QueryBuilder fields={fields} query={query} onQueryChange={handleChange} />
  )
}

export default Example
