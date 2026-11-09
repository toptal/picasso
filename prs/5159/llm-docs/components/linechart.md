# LineChart

Responsive line charts

## Props

### LineChart

| Name | Type | Default | Description |
|------|------|---------|-------------|
| height | `string \| number` | `200` | Height of chart |
| width | `string \| number` | - | Width of chart |
| tooltip | `boolean` | `false` | Toggle tooltip on hover |
| customTooltip | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Requires `tooltip` to be `true` |
| allowTooltipEscapeViewBox | `boolean` | `false` | Allows the tooltip to extend beyond the viewBox of the chart itself |
| layout | `"vertical" \| "horizontal"` | - | Layout of the barChart |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| unit | `string` | `d` | Text label to be displayed on the Y axis |
| xAxisKey | `string` | `x` | Name of point on the horizontal axis |
| **lineConfig** | `Record<string, { color: string; variant?: 'solid' \| 'reference' }>` | - | A dictionary of each line name as a key and the line's color and variant for value |
| children | `ReactNode` | - | Children component which will be rendered below the line graphs |
| showBottomYAxisLabel | `boolean` | - | Shows the bottom Y axis label |
| getXAxisTicks | `((orderedChartData: OrderedChartDataPoint[]) => number[])` | `(orderedData: OrderedChartDataPoint[]) =>
  orderedData.map(({ order }) => order)` | Returns X axis ticks based on data |
| getYAxisTicks | `((domain: Domain) => number[])` | `(domain: Domain) =>
  getD3Ticks(domain[0], domain[1], NUMBER_OF_TICKS)` | Returns Y axis ticks |
| formatYAxisTick | `((value: number, domain: Domain) => string)` | - | The formatter function of tick. |
| **data** | `{ [key: string] : string\|number; }[]` | - | A list of data points to be rendered as a line chart |
| highlights | `{ from : number; to: number; color: string; }[]` | - | A list of regions to be highlighted |
| referenceLines | `{ y : number; color: string; }[]` | - | Will display a full-width horizontal dashed line at the specified height in the specified color |

### Default

```tsx
import React from 'react'
import { palette } from '@toptal/picasso-utils'
import { LineChart } from '@toptal/picasso-charts'
import { Page } from '@toptal/picasso'

const Example = () => (
  <Page.Content>
    <Page.Article>
      <LineChart
        data={CHART_DATA}
        highlights={HIGHLIGHTS}
        lineConfig={{
          talents: { color: palette.blue.main },
        }}
      />
    </Page.Article>
  </Page.Content>
)

const HIGHLIGHTS = [
  {
    from: 6,
    to: 8,
    color: palette.yellow.main,
  },
  {
    from: 12,
    to: 13,
    color: palette.yellow.main,
  },
]

const CHART_DATA = [
  { x: 'Oct 20', talents: 1.7 },
  { x: 'Oct 21', talents: 2 },
  { x: 'Oct 22', talents: 1.7 },
  { x: 'Oct 23', talents: 2 },
  { x: 'Oct 24', talents: 1.5 },
  { x: 'Oct 25', talents: 1.3 },
  { x: 'Oct 26', talents: 1.6 },
  { x: 'Oct 27', talents: 2.7 },
  { x: 'Oct 28', talents: 3.7 },
  { x: 'Oct 29', talents: 1.7 },
  { x: 'Oct 30', talents: 1.5 },
  { x: 'Oct 31', talents: 1.6 },
  { x: 'Nov 01', talents: 2 },
  { x: 'Nov 02', talents: 1.5 },
  { x: 'Nov 03', talents: 1.3 },
  { x: 'Nov 04', talents: 1.5 },
  { x: 'Nov 05', talents: 1.5 },
  { x: 'Nov 06', talents: 1.8 },
  { x: 'Nov 07', talents: 1.6 },
  { x: 'Nov 08', talents: 2 },
  { x: 'Nov 09', talents: 2 },
  { x: 'Nov 10', talents: 3.1 },
]

export default Example
```

### Multiple Lines

```tsx
import React from 'react'
import { palette, SPACING_2, SPACING_4 } from '@toptal/picasso-utils'
import { LineChart } from '@toptal/picasso-charts'
import { Page, Paper, Container, Typography, Indicator } from '@toptal/picasso'

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length > 0) {
    // eslint-disable-next-line id-length
    const { x, infected, recovered, died } = payload[0].payload

    return (
      <Paper>
        <Container padded={SPACING_2}>
          <Typography size='medium'>Date: {x}</Typography>
          <Container>
            <Container inline right={SPACING_4}>
              <Indicator color='yellow' />
            </Container>
            <Typography inline size='medium'>
              Infected: {infected}
            </Typography>
          </Container>

          <Container>
            <Container inline right={SPACING_4}>
              <Indicator color='red' />
            </Container>
            <Typography inline size='medium'>
              Died: {died}
            </Typography>
          </Container>

          <Container>
            <Container inline right={SPACING_4}>
              <Indicator color='green' />
            </Container>
            <Typography inline size='medium'>
              Recovered: {recovered}
            </Typography>
          </Container>
        </Container>
      </Paper>
    )
  }

  return null
}

const Example = () => (
  <Page.Content>
    <Page.Article>
      <LineChart
        tooltip
        xAxisKey='date'
        customTooltip={<CustomTooltip />}
        height={150}
        unit=' cases'
        data={CHART_DATA}
        lineConfig={{
          infected: { color: palette.yellow.main },
          recovered: { color: palette.blue.main },
          died: { color: palette.red.main },
        }}
      />
    </Page.Article>
  </Page.Content>
)

const CHART_DATA = [
  {
    date: '20',
    infected: 10,
    recovered: 5,
    died: 5,
  },
  {
    date: '21',
    infected: 9,
    recovered: 6,
    died: 3,
  },
  {
    date: '22',
    infected: 9,
    recovered: 6,
    died: 3,
  },
  {
    date: '23',
    infected: 8,
    recovered: 4,
    died: 4,
  },
  {
    date: '24',
    infected: 11,
    recovered: 6,
    died: 5,
  },
  {
    date: '25',
    infected: 7,
    recovered: 7,
    died: 0,
  },
  {
    date: '26',
    infected: 11,
    recovered: 7,
    died: 4,
  },
  {
    date: '27',
    infected: 7,
    recovered: 4,
    died: 3,
  },
  {
    date: '28',
    infected: 12,
    recovered: 3,
    died: 9,
  },
  {
    date: '29',
    infected: 8,
    recovered: 6,
    died: 2,
  },
  {
    date: '30',
    infected: 8,
    recovered: 3,
    died: 5,
  },
  {
    date: '31',
    infected: 12,
    recovered: 4,
    died: 8,
  },
  {
    date: '01',
    infected: 7,
    recovered: 4,
    died: 3,
  },
  {
    date: '02',
    infected: 10,
    recovered: 4,
    died: 6,
  },
  {
    date: '03',
    infected: 7,
    recovered: 7,
    died: 0,
  },
  {
    date: '04',
    infected: 8,
    recovered: 5,
    died: 3,
  },
  {
    date: '05',
    infected: 11,
    recovered: 7,
    died: 4,
  },
  {
    date: '06',
    infected: 8,
    recovered: 3,
    died: 5,
  },
  {
    date: '07',
    infected: 11,
    recovered: 3,
    died: 8,
  },
  {
    date: '08',
    infected: 7,
    recovered: 6,
    died: 1,
  },
  {
    date: '09',
    infected: 12,
    recovered: 4,
    died: 8,
  },
  {
    date: '10',
    infected: 11,
    recovered: 6,
    died: 5,
  },
]

export default Example
```

### Show bottom Y axis label

```tsx
import React from 'react'
import { palette } from '@toptal/picasso-utils'
import { LineChart } from '@toptal/picasso-charts'
import { Page } from '@toptal/picasso'

const Example = () => (
  <Page.Content>
    <Page.Article>
      <LineChart
        data={CHART_DATA}
        showBottomYAxisLabel
        lineConfig={{
          talents: { color: palette.blue.main },
        }}
      />
    </Page.Article>
  </Page.Content>
)

const CHART_DATA = [
  { x: 'Oct 20', talents: 0 },
  { x: 'Oct 21', talents: 2 },
  { x: 'Oct 22', talents: 1.7 },
  { x: 'Oct 23', talents: 3 },
  { x: 'Oct 24', talents: 4.8 },
  { x: 'Oct 25', talents: 9.1 },
  { x: 'Oct 26', talents: 10 },
]

export default Example
```
