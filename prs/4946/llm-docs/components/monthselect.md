# MonthSelect

Month selector

## Props

### MonthSelect

| Name | Type | Default | Description |
|------|------|---------|-------------|
| from | `number` | - | a number of month select starts from. e.g. 5 for May |
| to | `number` | - | a number of month select ends at. e.g. 11 for November |

### Default

```tsx
import React, { useState } from 'react'
import { MonthSelect } from '@toptal/picasso'

const Example = () => {
  const [selectedOption, setSelectedOption] = useState<number | undefined>()

  const onChange = (e: React.ChangeEvent<{ value: number | undefined }>) => {
    setSelectedOption(e.target.value)
  }

  return (
    <MonthSelect
      width='auto'
      placeholder='Select month'
      onChange={onChange}
      value={selectedOption}
    />
  )
}

export default Example
```

### Filter months and years

```tsx
import React, { useState } from 'react'
import { Grid, Form, MonthSelect, YearSelect } from '@toptal/picasso'

const Example = () => {
  const [startMonth, setStartMonth] = useState<number | undefined>()
  const [endMonth, setEndMonth] = useState<number | undefined>()
  const [startYear, setStartYear] = useState<number | undefined>()
  const [endYear, setEndYear] = useState<number | undefined>()

  const CURRENT_YEAR = new Date().getFullYear()
  const START_YEAR = CURRENT_YEAR - 5

  const handleStartMonthChange = (
    e: React.ChangeEvent<{ value: number | undefined }>
  ) => {
    setStartMonth(e.target.value)
  }
  const handleEndMonthChange = (
    e: React.ChangeEvent<{ value: number | undefined }>
  ) => {
    setEndMonth(e.target.value)
  }

  const handleStartYearChange = (
    e: React.ChangeEvent<{ value: number | undefined }>
  ) => {
    const newStartYear = e.target.value

    setStartYear(newStartYear)

    if (newStartYear && endYear && newStartYear === endYear) {
      if (startMonth && endMonth && endMonth < startMonth) {
        setEndMonth(startMonth)
      }
    }
  }

  const handleEndYearChange = (
    e: React.ChangeEvent<{ value: number | undefined }>
  ) => {
    const newEndYear = e.target.value

    setEndYear(newEndYear)

    if (startYear && newEndYear && startYear === newEndYear) {
      if (startMonth && endMonth && endMonth < startMonth) {
        setEndMonth(startMonth)
      }
    }
  }

  return (
    <div>
      <Form.Field>
        <Form.Label>From</Form.Label>
        <Grid>
          <Grid.Item sm={2}>
            <MonthSelect
              width='full'
              onChange={handleStartMonthChange}
              value={startMonth}
              to={
                startYear && endYear && startYear === endYear
                  ? endMonth
                  : undefined
              }
              placeholder='Month'
            />
          </Grid.Item>

          <Grid.Item sm={2}>
            <YearSelect
              placeholder='Year'
              width='full'
              value={startYear}
              onChange={handleStartYearChange}
              from={START_YEAR}
              to={endYear || CURRENT_YEAR}
            />
          </Grid.Item>
        </Grid>
      </Form.Field>

      <Form.Field>
        <Form.Label>To</Form.Label>
        <Grid>
          <Grid.Item sm={2}>
            <MonthSelect
              value={endMonth}
              onChange={handleEndMonthChange}
              from={
                startYear && endYear && startYear === endYear
                  ? startMonth
                  : undefined
              }
              width='full'
              placeholder='Month'
            />
          </Grid.Item>

          <Grid.Item sm={2}>
            <YearSelect
              placeholder='Year'
              value={endYear}
              onChange={handleEndYearChange}
              width='full'
              from={startYear || START_YEAR}
              to={CURRENT_YEAR}
            />
          </Grid.Item>
        </Grid>
      </Form.Field>
    </div>
  )
}

export default Example
```
