# DatePicker

Date Picker component

## Props

### DatePicker

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `DatePickerValue` | - | Date that will be selected in `DatePicker` |
| **onChange** | `(value: DatePickerValue) => void` | - | Method that will be invoked with selected values |
| onBlur | `(() => void)` | - | Invoked when user goes away from `DatePicker` input |
| range | `boolean` | `false` | Whether calendar supports single date selection or range |
| minDate | `Date` | - | Earliest date available for selection |
| maxDate | `Date` | - | Latest date available for selection |
| hideOnSelect | `boolean` | `true` | Whether calendar should be closed after date selection. True by default |
| displayDateFormat | `string` | `MMM d, yyyy` | Date format that user will see in the input |
| disableDays | `{ dayOfWeek: number[]; }` | - | Days to disable. e.g. Disable Sundays and Saturdays {dayOfWeek: [0, 6]} |
| disabledIntervals | `CalendarDateRange[]` | - | Date range where selection is not allowed |
| editDateFormat | `string` | `MM-dd-yyyy` | Date format that user will see during manual input |
| icon | `ReactNode` | - | Specify icon which should be rendered inside `DatePicker` |
| autoComplete | `string` | `off` | Specify a value if want to enable browser autofill |
| status | `"error" \| "success" \| "warning" \| "default"` | `default` | Indicate `DatePicker` status |
| renderDay | `RenderDay` | - | Function to override default markup to show Date |
| weekStartsOn | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | - | Index of the first day of the week (0 - Sunday). Default is 1 - Monday |
| timezone | `string` | - | IANA timezone to display and edit date(s) |
| parseInputValue | `DatePickerInputCustomValueParser` | - | Custom parser for `DatePicker`'s input value to process custom input value, like, human-readable dates |
| popperProps | `{ [key: `data-${string}`]: unknown; }` | - | Additional data-* attrs for the inner Popper |
| footer | `ReactNode` | - | Adds a customized footer at the bottom of the calendar |
| footerBackgroundColor | `string` | - | Change the footer background color |
| indicatedIntervals | `CalendarDateRange[]` | - | Shows orange dot indicator in days between a date range |
| numberOfMonths | `1 \| 2` | `1` | Display more than one month at the same time |
| dropdownNavigation | `boolean` | - | Display dropdown navigation between months and years (requires minDate and maxDate to be set) |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| size | `"small" \| "medium" \| "large"` | - | Component size |
| autoFocus | `boolean` | - | If true, the input element will be focused during the first mount |
| disabled | `boolean` | - | If true, the `Input` will be disabled |
| name | `string` | - | Name attribute of the input element |
| placeholder | `string` | - | Placeholder for value |
| width | `"full" \| "shrink" \| "auto"` | - | Width of the component |
| id | `string` | - | The id of the `input` element. |
| iconPosition | `"start" \| "end"` | - | Whether icon should be placed at the beginning or end of the `Input` |
| multilineResizable | `boolean` | - | Whether a multiline can be manually resized by the user, requires multiline prop to be set to true |
| rowsMax | `string \| number` | - | Maximum number of rows to display when multiline option is set to true. |
| startAdornment | `ReactNode` | - | Adds element at the start of the input - can't be used in combination with `iconPosition: start` |
| endAdornment | `ReactNode` | - | Adds element at the end of the input - can't be used in combination with `iconPosition: end` |
| limit | `number` | - | Adds a counter of characters (ignored in combination with `counter: entered`) |
| counter | `"remaining" \| "entered"` | - | Type of the counter of characters |
| enableReset | `boolean` | - | Whether to render reset icon when there is a value in the input |
| onResetClick | `((event: MouseEvent<HTMLButtonElement & HTMLAnchorElement, MouseEvent>) => void)` | - | Callback invoked when reset button was clicked |
| outlineRef | `Ref<HTMLElement>` | - | Ref of the input outline |

### Default

```tsx
import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso'

const DefaultExample = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
      />
    </div>
  )
}

export default DefaultExample
```

### Range Mode

```tsx
import React, { useState } from 'react'
import type { DatePickerValue } from '@toptal/picasso'
import { DatePicker } from '@toptal/picasso'

const RangeExample = () => {
  const [value, setValue] = useState<DatePickerValue>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        range
        value={value}
        onChange={dates => {
          setValue(dates)
        }}
      />
    </div>
  )
}

export default RangeExample
```

### Drawer

```tsx
import { Container, DatePicker, Drawer } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import React, { useCallback, useState } from 'react'

const DefaultExample = () => {
  const [opened, setOpened] = useState(false)
  const [val, setVal] = useState<Date>()

  const toggleOpened = useCallback(
    () => setOpened(prevOpened => !prevOpened),
    [setOpened]
  )

  return (
    <>
      <button onClick={toggleOpened}>Open Drawer</button>
      <Drawer open={opened} onClose={() => setOpened(false)}>
        <Container padded={SPACING_4}>
          <DatePicker
            value={val}
            onChange={date => {
              if (date instanceof Date) {
                setVal(date)
              }
            }}
          />
        </Container>
      </Drawer>
    </>
  )
}

export default DefaultExample
```

### With onBlur handler

Fire onBlur handler on click outside or navigate with tab

```tsx
import React, { useState } from 'react'
import type { DatePickerValue } from '@toptal/picasso'
import { DatePicker } from '@toptal/picasso'

const WithOnBlurHandlerExample = () => {
  const [datepickerValue, setDatepickerValue] = useState<DatePickerValue>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        onBlur={() => {
          // handle on blur
        }}
        onChange={(date: DatePickerValue) => {
          setDatepickerValue(date)
        }}
      />
    </div>
  )
}

export default WithOnBlurHandlerExample
```

### With no hideOnSelect

Do not hide calendar on date select

```tsx
import React, { useState } from 'react'
import type { DatePickerValue } from '@toptal/picasso'
import { DatePicker } from '@toptal/picasso'

const WithNoHideOnSelect = () => {
  const [datepickerValue, setDatepickerValue] = useState<DatePickerValue>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        hideOnSelect={false}
        onChange={(date: DatePickerValue) => {
          setDatepickerValue(date)
        }}
      />
    </div>
  )
}

export default WithNoHideOnSelect
```

### With reset button

```tsx
import React, { useState } from 'react'
import type { DatePickerValue } from '@toptal/picasso'
import { DatePicker } from '@toptal/picasso'

const WithResetButton = () => {
  const [datepickerValue, setDatepickerValue] = useState<DatePickerValue>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        enableReset
        onResetClick={() => setDatepickerValue(null)}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithResetButton
```

### With initial value specified

```tsx
import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso'

const WithInitialValueExample = () => {
  const [datepickerValue, setDatepickerValue] = useState(new Date(2019, 10, 10))

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithInitialValueExample
```

### With Input Props

```tsx
import React, { useState } from 'react'
import { DatePicker, Search16 } from '@toptal/picasso'

const WithInputPropsExample = () => {
  const [value, setValue] = useState<Date>()

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <DatePicker
        value={value}
        icon={<Search16 />}
        iconPosition='end'
        width='full'
        placeholder='Please select date...'
        onChange={date => {
          setValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithInputPropsExample
```

### Autocomplete

```tsx
import type { FormEvent } from 'react'
import React, { useState } from 'react'
import { DatePicker, Form, Button, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const AutocompleteExample = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <Form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()
        }}
      >
        <Form.Field>
          <Form.Label>Disabled by default</Form.Label>
          <DatePicker
            name='date'
            value={datepickerValue}
            onChange={date => {
              setDatepickerValue(date as Date)
            }}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>Enabled</Form.Label>
          <DatePicker
            name='cc-exp'
            value={datepickerValue}
            autoComplete='cc-exp'
            onChange={date => {
              setDatepickerValue(date as Date)
            }}
          />
        </Form.Field>

        <Container top={SPACING_4}>
          <Button type='submit'>
            Submit to include value to the browser autocomplete
          </Button>
        </Container>
      </Form>
    </div>
  )
}

export default AutocompleteExample
```

### Status

```tsx
import React, { useState } from 'react'
import type { DatePickerValue } from '@toptal/picasso'
import { DatePicker, Form } from '@toptal/picasso'

const Example = () => {
  const [datepickerValue, setDatepickerValue] = useState<DatePickerValue>()

  return (
    <Form>
      <Form.Field>
        <Form.Label>Default</Form.Label>
        <DatePicker
          value={datepickerValue}
          onChange={date => {
            setDatepickerValue(date)
          }}
          status='default'
        />
      </Form.Field>
      <Form.Field>
        <Form.Label>Error</Form.Label>
        <DatePicker
          value={datepickerValue}
          onChange={date => {
            setDatepickerValue(date)
          }}
          status='error'
        />
      </Form.Field>
      <Form.Field>
        <Form.Label>Warning</Form.Label>
        <DatePicker
          value={datepickerValue}
          onChange={date => {
            setDatepickerValue(date)
          }}
          status='warning'
        />
      </Form.Field>
      <Form.Field>
        <Form.Label>Success</Form.Label>
        <DatePicker
          value={datepickerValue}
          onChange={date => {
            setDatepickerValue(date)
          }}
          status='success'
        />
      </Form.Field>
    </Form>
  )
}

export default Example
```

### With Selection Limits

```tsx
import React, { useState } from 'react'
import { DatePicker, Search16 } from '@toptal/picasso'

const WithSelectionLimitsExample = () => {
  const [value, setValue] = useState(new Date('2015-12-12'))
  const minDate = new Date('2015-12-01')
  const maxDate = new Date('2015-12-30')
  const disabledIntervals = [
    { start: new Date('2015-12-03'), end: new Date('2015-12-08') },
    { start: new Date('2015-12-20'), end: new Date('2015-12-30') },
  ]

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <DatePicker
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        icon={<Search16 />}
        iconPosition='end'
        placeholder='Please select date...'
        disabledIntervals={disabledIntervals}
        onChange={date => {
          setValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithSelectionLimitsExample
```

### With Disabled Days

```tsx
import React, { useState } from 'react'
import { DatePicker, Search16 } from '@toptal/picasso'

const WithDisabledDaysExample = () => {
  const [value, setValue] = useState(new Date('2015-12-10'))
  const minDate = new Date('2015-12-01')
  const maxDate = new Date('2015-12-30')

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <DatePicker
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        icon={<Search16 />}
        iconPosition='end'
        placeholder='Please select date...'
        disableDays={{ dayOfWeek: [0, 2] }}
        onChange={date => {
          setValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithDisabledDaysExample
```

### With Custom Day rendering

```tsx
import React, { useState } from 'react'
import { Tooltip, DatePicker } from '@toptal/picasso'
import { isBefore, isWithinInterval } from 'date-fns'

const WithCustomDayRendering = () => {
  const [datepickerValue, setDatepickerValue] = useState(new Date('2015-12-12'))

  const minDate = new Date('2015-12-07')

  const disabledIntervals = [
    { start: new Date('2015-12-20'), end: new Date('2015-12-30') },
  ]

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        minDate={minDate}
        disabledIntervals={disabledIntervals}
        renderDay={({ date, children, isSelectable }) => {
          const day = new Date(date)

          if (!isSelectable) {
            if (isBefore(day, minDate)) {
              return <Tooltip content='It is vacation time'>{children}</Tooltip>
            }
            const isWithinDisabledInterval = disabledIntervals.some(interval =>
              isWithinInterval(day, interval)
            )

            if (isWithinDisabledInterval) {
              return <Tooltip content='In a meeting'>{children}</Tooltip>
            }
          }

          return children
        }}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithCustomDayRendering
```

### With Timezone

```tsx
import React, { useState } from 'react'
import { DatePicker, Search16 } from '@toptal/picasso'

const WithTimezoneExample = () => {
  const timezone = 'Asia/Tokyo'
  const [value, setValue] = useState(new Date('2015-12-12T16:00:00'))

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <DatePicker
        value={value}
        timezone={timezone}
        icon={<Search16 />}
        iconPosition='end'
        placeholder='Please select date...'
        onChange={date => {
          setValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithTimezoneExample
```

### With DatePicker's Input custom value parser

Type any year value like `2015` to get a random date within this year

```tsx
import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso'

const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

const customDateParser = (value: string): Date | null | undefined => {
  if (!/^[0-9]{1,4}$/.test(value)) {
    return
  }

  const currentYear = new Date().getFullYear().toString()
  const normalizedYear = parseInt(
    currentYear.slice(0, currentYear.length - value.length).concat(value)
  )

  const startDate = new Date(normalizedYear, 0, 1)
  const endDate = new Date(normalizedYear, 11, 31)

  return getRandomDate(startDate, endDate)
}

const WithHumanReadableDateParsing = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        parseInputValue={customDateParser}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithHumanReadableDateParsing
```

### With Indicated Range

Show as indicated a range of dates

```tsx
import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso'

const WithIndicatedRangeRendering = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>(
    new Date('2021-07-14')
  )

  const indicatedIntervals = [
    { start: new Date('2021-07-11'), end: new Date('2021-07-16') },
    { start: new Date('2021-07-18'), end: new Date('2021-07-23') },
  ]

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        indicatedIntervals={indicatedIntervals}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithIndicatedRangeRendering
```

### With Footer

Show a custom footer at the bottom of the calendar

```tsx
import React, { useState } from 'react'
import { DatePicker, Link, Typography } from '@toptal/picasso'

const WithFooterRendering = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
        footer={
          <Typography size='small'>
            Got a question? <Link href='#'>Talk to us</Link>
          </Typography>
        }
      />
    </div>
  )
}

export default WithFooterRendering
```

### With Footer background color customized

Show a custom color footer at the bottom of the calendar

```tsx
import React, { useState } from 'react'
import {
  Chat16,
  Container,
  DatePicker,
  Link,
  Typography,
} from '@toptal/picasso'
import { SPACING_2, palette } from '@toptal/picasso-utils'

const WithFooterBackgroundColorRendering = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
        footer={
          <Container flex>
            <Container right={SPACING_2}>
              {' '}
              <Chat16 />{' '}
            </Container>
            <Container>
              <Typography size='small'>
                <Link href='#'>Got a question on end date? Talk to us</Link>
              </Typography>
            </Container>
          </Container>
        }
        footerBackgroundColor={palette.grey.lighter}
      />
    </div>
  )
}

export default WithFooterBackgroundColorRendering
```

### With two months

Display two months at the same time (not applicable to screens below SM size)

```tsx
import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso'

const TwoMonthsExample = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        numberOfMonths={2}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
      />
    </div>
  )
}

export default TwoMonthsExample
```

### Dropdown Navigation

Display an alternative navigation for the calendar, using dropdowns for month and year selection

```tsx
import React, { useState } from 'react'
import { DatePicker, Typography } from '@toptal/picasso'

const DefaultExample = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <Typography>
        Requires minDate and maxDate to be set in order to work
      </Typography>
      <br />
      <DatePicker
        value={datepickerValue}
        minDate={new Date('1990-01-01')}
        maxDate={new Date('2022-11-30')}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
        dropdownNavigation
      />
    </div>
  )
}

export default DefaultExample
```
