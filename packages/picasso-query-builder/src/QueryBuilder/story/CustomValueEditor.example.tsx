import React, { useState } from 'react'
import { QueryBuilder } from '@toptal/picasso-query-builder'
import type {
  Field,
  ValueEditorProps,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import { Input, Select } from '@toptal/picasso'

const initialQuery = {
  rules: [],
  combinator: 'and',
}

const fields: Field[] = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter first name',
    inputType: 'text',
  },
  { name: 'age', label: 'Age', inputType: 'number' },
  { name: 'height', label: 'Height', inputType: 'number' },
]

const options = [
  { label: 'Select Option 1', value: '1', text: 'Custom Option 1' },
  { label: 'Select Option 2', value: '2', text: 'Custom Option 2' },
  { label: 'Select Option 3', value: '3', text: 'Custom Option 3' },
]

const CustomValueEditor = (props: ValueEditorProps) => {
  const [selectedOption, setSelectedOption] = useState(props.value)

  const handleOptionChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: string }>
  ) => {
    const newValue = event.target.value

    setSelectedOption(newValue)
    props.handleOnChange(newValue)
  }

  if (props.inputType === 'text') {
    return (
      <Select
        options={options}
        name='Custom Value Editor'
        value={selectedOption}
        onChange={handleOptionChange}
        placeholder='Custom Value Editor'
      />
    )
  }

  return <Input placeholder='Default Value Editor' />
}

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  return (
    <QueryBuilder
      query={query}
      onQueryChange={handleQueryChange}
      fields={fields}
      customValueEditor={CustomValueEditor}
    />
  )
}

export default Example
