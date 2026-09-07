# AnalyticsChart

Use LineChart with analytics data

## Props

### AnalyticsChart

| Name | Type | Default | Description |
|------|------|---------|-------------|
| height | `string \| number` | - | Height of chart |
| width | `string \| number` | - | Width of chart |
| tooltip | `boolean` | - | Toggle tooltip on hover |
| customTooltip | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Requires `tooltip` to be `true` |
| allowTooltipEscapeViewBox | `boolean` | - | Allows the tooltip to extend beyond the viewBox of the chart itself |
| layout | `"vertical" \| "horizontal"` | - | Layout of the barChart |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| unit | `string` | - | Text label to be displayed on the Y axis |
| xAxisKey | `string` | `x` | Name of point on the horizontal axis |
| **lineConfig** | `Record<string, { color: string; variant?: 'solid' \| 'reference' }>` | - | A dictionary of each line name as a key and the line's color and variant for value |
| children | `ReactNode` | - | Children component which will be rendered below the line graphs |
| showBottomYAxisLabel | `boolean` | - | Shows the bottom Y axis label |
| getXAxisTicks | `((orderedChartData: OrderedChartDataPoint[]) => number[])` | - | Returns X axis ticks based on data |
| getYAxisTicks | `((domain: Domain) => number[])` | - | Returns Y axis ticks |
| formatYAxisTick | `((value: number, domain: Domain) => string)` | - | The formatter function of tick. |
| **data** | `{ id : string; values: Record<string, number\|null>; }[]` | - | A record of data points to be rendered as a line chart |
| highlights | `{ data : string[]; color: string; }[]` | - | A list of dates and to be highlighted |
| referenceLines | `{ data : Record<string, number>; color: string; }[]` | - | A record of data points to be rendered as a dashed horizontal line |
| formatXAxisLabel | `((label: string) => string)` | `(label: string) => label` | A function to custom format the X axis label |
| granularity | `"month" \| "week" \| "day" \| "hour"` | - | A value that helps formatting the chart |

### Default

```tsx
import React from 'react'
import { palette } from '@toptal/picasso-utils'
import { AnalyticsChart } from '@topkit/analytics-charts'
import { Page } from '@toptal/picasso'

const Example = () => (
  <Page.Content>
    <Page.Article>
      <AnalyticsChart
        data={CHART_DATA}
        lineConfig={{
          role: { color: palette.blue.main },
        }}
      />
    </Page.Article>
  </Page.Content>
)

const CHART_DATA = [
  {
    id: 'role',
    values: {
      '2020-10-20': 1.7,
      '2020-10-21': 2,
      '2020-10-22': 1.7,
      '2020-10-23': 2,
      '2020-10-24': 1.5,
      '2020-10-25': 1.3,
      '2020-10-26': 1.6,
      '2020-10-27': 2.7,
      '2020-10-28': 3.7,
      '2020-10-29': 1.7,
      '2020-10-30': 1.5,
      '2020-10-31': 1.6,
      '2020-11-01': 2,
      '2020-11-02': 1.5,
      '2020-11-03': 1.3,
      '2020-11-04': 1.5,
      '2020-11-05': 1.5,
      '2020-11-06': 1.8,
      '2020-11-07': 1.6,
      '2020-11-08': 2,
      '2020-11-09': 2,
      '2020-11-10': 3.1,
    },
  },
]

export default Example
```

### Multiple

```tsx
import React from 'react'
import { palette } from '@toptal/picasso-utils'
import { AnalyticsChart } from '@topkit/analytics-charts'
import { Page } from '@toptal/picasso'

const Example = () => (
  <Page.Content>
    <Page.Article>
      <AnalyticsChart
        data={CHART_DATA}
        lineConfig={{
          role: { color: palette.yellow.main },
          team: { color: palette.blue.main },
        }}
      />
    </Page.Article>
  </Page.Content>
)

const CHART_DATA = [
  {
    id: 'role',
    values: {
      '2020-10-20': 0.0,
      '2020-10-21': 0.0,
      '2020-10-22': 0.0,
      '2020-10-23': 0.0,
      '2020-10-24': 0.0,
      '2020-10-25': 0.0,
      '2020-10-26': 0.0,
      '2020-10-27': 0.0,
      '2020-10-28': 0.0,
      '2020-10-29': 0.0,
      '2020-10-30': 1.0,
      '2020-10-31': 1.0,
      '2020-11-01': 0.0,
      '2020-11-02': 0.0,
      '2020-11-03': 0.0,
      '2020-11-04': 0.0,
      '2020-11-05': 0.0,
      '2020-11-06': 0.0,
      '2020-11-07': 2.0,
      '2020-11-08': 0.0,
      '2020-11-09': 0.0,
      '2020-11-10': 0.0,
    },
  },
  {
    id: 'team',
    values: {
      '2020-10-20': 1.7,
      '2020-10-21': 2,
      '2020-10-22': 1.7,
      '2020-10-23': 2,
      '2020-10-24': 1.5,
      '2020-10-25': 1.3,
      '2020-10-26': 1.6,
      '2020-10-27': 2.7,
      '2020-10-28': 3.7,
      '2020-10-29': 1.7,
      '2020-10-30': 1.5,
      '2020-10-31': 1.6,
      '2020-11-01': 2,
      '2020-11-02': 1.5,
      '2020-11-03': 1.3,
      '2020-11-04': 1.5,
      '2020-11-05': 1.5,
      '2020-11-06': 1.8,
      '2020-11-07': 1.6,
      '2020-11-08': 2,
      '2020-11-09': 2,
      '2020-11-10': 3.1,
    },
  },
]

export default Example
```

### Null values

You can provide `null` values as part of chart dataset. Those values will be indicated by "empty" dots on the chart. Additionally this information will be passed to custom tooltip component in case you will need it there.

```tsx
import React from 'react'
import { Container, Page } from '@toptal/picasso'
import { palette } from '@toptal/picasso-utils'
import { AnalyticsChart } from '@topkit/analytics-charts'

type Payload = {
  name: string
  value: number
  payload: Record<string, number | boolean>
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean
  payload?: Payload[]
}) => {
  if (!active || !payload) {
    return null
  }

  return (
    <Container style={{ background: '#fff' }}>
      {payload.map(({ name, value, payload: data }) => (
        <Container key={name}>
          <b>{name}</b>: {data[`${name}IsEmpty`] ? 'No data provided.' : value}
        </Container>
      ))}
    </Container>
  )
}

const Example = () => (
  <Page.Content>
    <Page.Article>
      <AnalyticsChart
        tooltip
        customTooltip={<CustomTooltip />}
        data={CHART_DATA}
        lineConfig={{
          role: { color: palette.yellow.main },
          team: { color: palette.blue.main },
        }}
      />
    </Page.Article>
  </Page.Content>
)

const CHART_DATA = [
  {
    id: 'role',
    values: {
      '2020-10-20': 0.0,
      '2020-10-21': 0.0,
      '2020-10-22': 0.0,
      '2020-10-23': 0.0,
      '2020-10-24': 0.0,
      '2020-10-25': 0.0,
      '2020-10-26': null,
      '2020-10-27': 0.0,
      '2020-10-28': 0.0,
      '2020-10-29': 0.0,
      '2020-10-30': 1.0,
      '2020-10-31': 1.0,
      '2020-11-01': 0.0,
      '2020-11-02': null,
      '2020-11-03': 0.0,
      '2020-11-04': 0.0,
      '2020-11-05': 0.0,
      '2020-11-06': 0.0,
      '2020-11-07': 2.0,
      '2020-11-08': 0.0,
      '2020-11-09': 0.0,
      '2020-11-10': 0.0,
    },
  },
  {
    id: 'team',
    values: {
      '2020-10-20': 1.7,
      '2020-10-21': 2,
      '2020-10-22': 1.7,
      '2020-10-23': 2,
      '2020-10-24': 1.5,
      '2020-10-25': 1.3,
      '2020-10-26': 1.6,
      '2020-10-27': 2.7,
      '2020-10-28': 3.7,
      '2020-10-29': null,
      '2020-10-30': 1.5,
      '2020-10-31': 1.6,
      '2020-11-01': 2,
      '2020-11-02': 1.5,
      '2020-11-03': 1.3,
      '2020-11-04': 1.5,
      '2020-11-05': 1.5,
      '2020-11-06': 1.8,
      '2020-11-07': null,
      '2020-11-08': 2,
      '2020-11-09': 2,
      '2020-11-10': 3.1,
    },
  },
]

export default Example
```

### Highlights

```tsx
import React from 'react'
import { palette } from '@toptal/picasso-utils'
import { AnalyticsChart } from '@topkit/analytics-charts'
import { Page } from '@toptal/picasso'

const Example = () => (
  <Page.Content>
    <Page.Article>
      <AnalyticsChart
        data={CHART_DATA}
        highlights={[
          {
            data: ['2020-10-21'],
            color: palette.green.main,
          },
          {
            data: ['2020-11-01', '2020-11-02'],
            color: palette.red.main,
          },
        ]}
        lineConfig={{
          team: { color: palette.blue.main },
        }}
      />
    </Page.Article>
  </Page.Content>
)

const CHART_DATA = [
  {
    id: 'team',
    values: {
      '2020-10-20': 1.7,
      '2020-10-21': 2,
      '2020-10-22': 1.7,
      '2020-10-23': 2,
      '2020-10-24': 1.5,
      '2020-10-25': 1.3,
      '2020-10-26': 1.6,
      '2020-10-27': 2.7,
      '2020-10-28': 3.7,
      '2020-10-29': 1.7,
      '2020-10-30': 1.5,
      '2020-10-31': 1.6,
      '2020-11-01': 2,
      '2020-11-02': 1.5,
      '2020-11-03': 1.3,
      '2020-11-04': 1.5,
      '2020-11-05': 1.5,
      '2020-11-06': 1.8,
      '2020-11-07': 1.6,
      '2020-11-08': 2,
      '2020-11-09': 2,
      '2020-11-10': 3.1,
    },
  },
]

export default Example
```

### Reference Lines

```tsx
import React from 'react'
import { Page } from '@toptal/picasso'
import { palette } from '@toptal/picasso-utils'
import { AnalyticsChart } from '@topkit/analytics-charts'

const Example = () => (
  <Page.Content>
    <Page.Article>
      <AnalyticsChart
        data={CHART_DATA}
        referenceLines={[
          {
            data: REFERENCE_LINE_DATA.red,
            color: palette.red.main,
          },
          {
            data: REFERENCE_LINE_DATA.green,
            color: palette.green.main,
          },
        ]}
        lineConfig={{
          team: { color: palette.blue.main },
        }}
      />
    </Page.Article>
  </Page.Content>
)

const CHART_DATA = [
  {
    id: 'team',
    values: {
      '2020-10-20': 1.7,
      '2020-10-21': 2,
      '2020-10-22': 1.7,
      '2020-10-23': 2,
      '2020-10-24': 1.5,
      '2020-10-25': 1.3,
      '2020-10-26': 1.6,
      '2020-10-27': 2.7,
      '2020-10-28': 3.7,
      '2020-10-29': 1.7,
      '2020-10-30': 1.5,
      '2020-10-31': 1.6,
      '2020-11-01': 2,
      '2020-11-02': 1.5,
      '2020-11-03': 1.3,
      '2020-11-04': 1.5,
      '2020-11-05': 1.5,
      '2020-11-06': 1.8,
      '2020-11-07': 1.6,
      '2020-11-08': 2,
      '2020-11-09': 2,
      '2020-11-10': 3.1,
    },
  },
]

const REFERENCE_LINE_DATA = {
  red: {
    '2020-10-20': 2,
    '2020-10-21': 2,
    '2020-10-22': 2,
    '2020-10-23': 2,
    '2020-10-24': 2,
    '2020-10-25': 2,
    '2020-10-26': 2,
    '2020-10-27': 2,
    '2020-10-28': 2,
    '2020-10-29': 2,
    '2020-10-30': 2,
    '2020-10-31': 2,
    '2020-11-01': 3,
    '2020-11-02': 3,
    '2020-11-03': 3,
    '2020-11-04': 3,
    '2020-11-05': 3,
    '2020-11-06': 3,
    '2020-11-07': 3,
    '2020-11-08': 3,
    '2020-11-09': 3,
    '2020-11-10': 3,
  },
  green: {
    '2020-10-20': 1,
    '2020-10-21': 1,
    '2020-10-22': 1,
    '2020-10-23': 1,
    '2020-10-24': 1,
    '2020-10-25': 1,
    '2020-10-26': 1,
    '2020-10-27': 1,
    '2020-10-28': 1,
    '2020-10-29': 1,
    '2020-10-30': 1,
    '2020-10-31': 1,
    '2020-11-01': 1,
    '2020-11-02': 1,
    '2020-11-03': 1,
    '2020-11-04': 1,
    '2020-11-05': 1,
    '2020-11-06': 1,
    '2020-11-07': 1,
    '2020-11-08': 1,
    '2020-11-09': 1,
    '2020-11-10': 1,
  },
}

export default Example
```

### Custom Format xAxis Label

```tsx
import React from 'react'
import { format, parseISO } from 'date-fns'
import { palette } from '@toptal/picasso-utils'
import { AnalyticsChart } from '@topkit/analytics-charts'
import { Page } from '@toptal/picasso'

const Example = () => (
  <Page.Content>
    <Page.Article>
      <AnalyticsChart
        data={CHART_DATA}
        lineConfig={{
          role: { color: palette.blue.main },
        }}
        formatXAxisLabel={(label: string) => format(parseISO(label), 'MMM dd')}
      />
    </Page.Article>
  </Page.Content>
)

const CHART_DATA = [
  {
    id: 'role',
    values: {
      '2020-10-20': 1.7,
      '2020-10-21': 2,
      '2020-10-22': 1.7,
      '2020-10-23': 2,
      '2020-10-24': 1.5,
      '2020-10-25': 1.3,
      '2020-10-26': 1.6,
      '2020-10-27': 2.7,
      '2020-10-28': 3.7,
      '2020-10-29': 1.7,
      '2020-10-30': 1.5,
      '2020-10-31': 1.6,
      '2020-11-01': 2,
      '2020-11-02': 1.5,
      '2020-11-03': 1.3,
      '2020-11-04': 1.5,
      '2020-11-05': 1.5,
      '2020-11-06': 1.8,
      '2020-11-07': 1.6,
      '2020-11-08': 2,
      '2020-11-09': 2,
      '2020-11-10': 3.1,
    },
  },
]

export default Example
```

### Granularity

```tsx
import React from 'react'
import { format, parseISO, addHours } from 'date-fns'
import { palette } from '@toptal/picasso-utils'
import { AnalyticsChart } from '@topkit/analytics-charts'
import { Page } from '@toptal/picasso'

const Example = () => (
  <Page.Content>
    <Page.Article>
      <h3>Granularity: day</h3>
      <AnalyticsChart
        data={CHART_DATA_DAY}
        lineConfig={{
          global: { color: palette.blue.main },
        }}
        granularity='day'
        unit='minutes'
        formatXAxisLabel={label => format(parseISO(label), 'MMM dd')}
        showBottomYAxisLabel
      />

      <h3>Granularity: hour</h3>
      <AnalyticsChart
        data={CHART_DATA_HOUR}
        lineConfig={{
          global: { color: palette.blue.main },
        }}
        granularity='hour'
        unit='minutes'
        formatXAxisLabel={label => format(addHours(parseISO(label), 1), 'ha')}
        showBottomYAxisLabel
      />
    </Page.Article>
  </Page.Content>
)

const CHART_DATA_DAY = [
  {
    id: 'global',
    values: {
      '2020-11-10': 684.18,
      '2020-11-11': 843.88,
      '2020-11-12': 950.23,
      '2020-11-13': 1049.47,
      '2020-11-14': 1220,
      '2020-11-15': 1294.53,
      '2020-11-16': 1406.08,
      '2020-11-17': 1865.98,
      '2020-11-18': 2430.15,
      '2020-11-19': 2740,
      '2020-11-20': 3347.23,
      '2020-11-21': 3777.12,
      '2020-11-22': 4107.37,
      '2020-11-23': 4157.9,
      '2020-11-24': 4385.87,
      '2020-11-25': 4499.3,
      '2020-11-26': 4306.65,
      '2020-11-27': 4277.67,
      '2020-11-28': 4760,
      '2020-11-29': 5229.86,
      '2020-11-30': 5436.27,
      '2020-12-01': 5399.07,
      '2020-12-02': 5375.63,
      '2020-12-03': 5443.1,
      '2020-12-04': 5015.43,
      '2020-12-05': 3494.52,
      '2020-12-06': 2700,
      '2020-12-07': 2516.31,
      '2020-12-08': 1944.33,
      '2020-12-09': 802.15,
    },
  },
]

const CHART_DATA_HOUR = [
  {
    id: 'global',
    values: {
      '2020-11-18 02:59:59': 5.2,
      '2020-11-18 03:59:59': 8.63,
      '2020-11-18 04:59:59': 6.5,
      '2020-11-18 05:59:59': 18.3,
      '2020-11-18 06:59:59': 23.87,
      '2020-11-18 07:59:59': 35.5,
      '2020-11-18 08:59:59': 16.67,
      '2020-11-18 09:59:59': 12.83,
      '2020-11-18 10:59:59': 18.08,
      '2020-11-18 11:59:59': 10.75,
      '2020-11-18 12:59:59': 19.89,
      '2020-11-18 13:59:59': 5.25,
      '2020-11-18 14:59:59': 6.17,
      '2020-11-18 15:59:59': 12.3,
      '2020-11-18 16:59:59': 8.67,
      '2020-11-18 17:59:59': 2.56,
      '2020-11-18 18:59:59': 4,
      '2020-11-18 19:59:59': 8,
      '2020-11-18 20:59:59': 1.78,
      '2020-11-18 21:59:59': 5.92,
      '2020-11-18 22:59:59': 20.5,
      '2020-11-18 23:59:59': null,
      '2020-11-19 00:59:59': null,
      '2020-11-19 01:59:59': null,
    },
  },
]

export default Example
```
