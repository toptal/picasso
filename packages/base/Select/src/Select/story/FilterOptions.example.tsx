import type { ChangeEvent } from 'react'
import React, { useState, useCallback } from 'react'
import type { SelectOption } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Select, Container, Typography } from '@toptal/picasso'

const FilterOptionsExample = () => {
  const [value, setValue] = useState<string>('')
  const [values, setValues] = useState<string[]>([])

  const handleChange = (
    event: ChangeEvent<{
      name?: string
      value: string
    }>
  ) => {
    setValue(event.target.value)
  }

  const handleMultipleChange = (
    event: React.ChangeEvent<{ value: string[] }>
  ) => {
    setValues(event.target.value)
  }

  const filterOptions = useCallback(
    (options: SelectOption[], searchValue: string) => {
      // custom filtering logic (e.g. filtering by the last word)
      const filteredOptions = options.filter(option =>
        option.text.toLowerCase().endsWith(searchValue.toLowerCase())
      )

      return filteredOptions
    },
    []
  )

  return (
    <Container flex inline>
      <Container right={SPACING_4}>
        <Typography variant='heading' size='small'>
          Non grouped
        </Typography>
        <Select
          onChange={handleChange}
          value={value}
          options={OPTIONS}
          placeholder='Choose an option...'
          width='auto'
          data-testid='select'
          searchThreshold={4}
          filterOptions={filterOptions}
        />
      </Container>
      <Container right={SPACING_4}>
        <Typography variant='heading' size='small'>
          Grouped
        </Typography>
        <Select
          onChange={handleMultipleChange}
          options={OPTION_GROUPS}
          value={values}
          placeholder='Choose an option...'
          width='auto'
          searchThreshold={4}
          filterOptions={filterOptions}
          multiple
        />
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' },
  { text: 'Romania', value: 'RO' },
]

const OPTION_GROUPS = {
  'Group 1': [
    { text: 'Belarus', value: 'BY' },
    { text: 'Croatia', value: 'HR' },
  ],
  'Group 2': [
    { text: 'Lithuania', value: 'LU' },
    { text: 'Slovakia', value: 'SK' },
  ],
  'Group 3': [
    { text: 'Ukraine', value: 'UA' },
    { text: 'Romania', value: 'RO' },
  ],
}

export default FilterOptionsExample
