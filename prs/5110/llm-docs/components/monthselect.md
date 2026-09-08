# MonthSelect

Month selector

## Props

### MonthSelect

| Name | Type | Default | Description |
|------|------|---------|-------------|
| from | `number` | - | a number of month select starts from. e.g. 5 for May |
| to | `number` | - | a number of month select ends at. e.g. 11 for November |
| onChange | `((event: ChangeEvent<{ name?: string; value: M extends true ? number[] : number; }>) => void)` | - | Callback invoked when `Select` changes its state. |
| size | `"small" \| "medium" \| "large"` | `medium` | Component size |
| value | `number \| number[]` | - | Selected value |
| disabled | `boolean` | - | If true, the 'Select' will be disabled |
| multiple | `boolean` | - | Allow selecting multiple values |
| placeholder | `string` | - | Placeholder option which is selected by default |
| width | `"full" \| "shrink" \| "auto"` | - | Width of the component |
| className | `string` | - | Classnames applied to root element |
| id | `string` | - | Component ID |
| style | `CSSProperties` | - | Style applied to root element |
| disablePortal | `boolean` | - | Whether to render select options in portal. Should be disabled in Modals |
| status | `"error" \| "warning" \| "default"` | - | Indicate whether `Select` is in `error`, `warning` or `default` state |
| menuWidth | `string` | - | Width of the menu |
| loading | `boolean` | - | Shows the loading icon when options are loading |
| searchPlaceholder | `string` | - | Placeholder for search input |
| iconPosition | `"start" \| "end"` | - | Whether icon should be placed at the beginning or end of the `Input` |
| icon | `ReactNode` | - | Specify icon which should be rendered inside Input |
| noOptionsText | `string` | - | Label to show when no options were found |
| renderOption | `((option: Option<number>, index?: number) => ReactNode)` | - | Callback responsible for rendering the option given the option and its index in the list of options |
| getDisplayValue | `((option: Option<string \| number> \| null) => string)` | - | A function that takes a display value from the option item |
| native | `boolean` | - | Whether to render native browser select or not |
| enableReset | `boolean` | - | Whether to render reset icon which clears selected value |
| enableResetSearch | `boolean` | - | Whether to render reset icon which clears search input value |
| searchThreshold | `number` | `10` | Defines the minimum options number to show the search |
| limit | `number` | `200` | Limits number of options to display on the list |
| enableAutofill | `boolean` | - | Specifies whether the autofill enabled or not, disabled by default |
| filterOptions | `((options: Option<string \| number>[], searchValue: string, getDisplayValue?: ((option: Option<string \| number> \| null) => string)) => Option<string \| number>[])` | - | A function that is invoked during search. It takes an array of options and a search value and returns filtered options |

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
