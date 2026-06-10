# YearSelect

Year select

## Props

### YearSelect

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **from** | `number` | - | a year select starts from. e.g. 2017 |
| **to** | `number` | - | a year select ends at. e.g. 2019 |
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
import { YearSelect } from '@toptal/picasso'

const Example = () => {
  const [year, setYear] = useState<number>()

  const onChange = (event: React.ChangeEvent<{ value: number }>) => {
    setYear(event.target.value)

    window.alert(event.target.value + ' is selected')
  }

  return (
    <YearSelect
      width='auto'
      placeholder='Select year'
      onChange={onChange}
      value={year}
      from={2017}
      to={2019}
    />
  )
}

export default Example
```
