# BarChart

Responsive bar charts

## Props

### BarChart

_No props._

### Default

```tsx
import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  {
    name: 'Claimed',
    value: { 'active talent': 23, 'potential talent': 30 },
  },
  {
    name: 'Contacted',
    value: { 'active talent': 5, 'potential talent': 9 },
  },
  {
    name: 'Approved',
    value: { 'active talent': 2, 'potential talent': 0 },
  },
  {
    name: 'Verified',
    value: { 'active talent': 2, 'potential talent': 0 },
  },
  {
    name: 'With a Deposit',
    value: { 'active talent': 2, 'potential talent': 0 },
  },
  {
    name: 'With an Active engagement',
    value: { 'active talent': 1, 'potential talent': 0 },
  },
]

const COLORS_MAPPING: Record<string, string> = {
  'active talent': palette.blue.main,
  'potential talent': palette.grey.dark,
}

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      data={CHART_DATA}
      getBarColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      getBarLabelColor={() => palette.grey.dark}
      width='100%'
    />
  </div>
)

export default Example
```

### Tooltip

Bar chart has built-in tooltips support. You can enable them via `tooltip` prop.

```tsx
import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  {
    name: 'Apple',
    value: { 'engineers hired': 500 },
  },
  {
    name: 'Google',
    value: { 'engineers hired': 700 },
  },
  {
    name: 'Facebook',
    value: { 'engineers hired': 600 },
  },
  {
    name: 'Amazon',
    value: { 'engineers hired': 400 },
  },
  {
    name: 'Toptal',
    value: { 'engineers hired': 1000 },
  },
]

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      data={CHART_DATA}
      getBarColor={() => palette.blue.main}
      width='100%'
      tooltip
    />
  </div>
)

export default Example
```

### Bar indicator

Bars can have a customized indicator.

```tsx
import React from 'react'
import { BarChart, BarChartIndicator } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  {
    name: 'Apple',
    value: { 'engineers hired': 500 },
  },
  {
    name: 'Google',
    value: { 'engineers hired': 700, isEnterprise: true },
  },
  {
    name: 'Facebook',
    value: { 'engineers hired': 600 },
  },
  {
    name: 'Amazon',
    value: { 'engineers hired': 400 },
  },
  {
    name: 'Toptal',
    value: { 'engineers hired': 1000 },
  },
]

const INDICATORS: any = {
  Google: { color: palette.blue.light, label: 'E' },
  Amazon: { color: palette.purple.main, label: 'E' },
}

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      width='100%'
      data={CHART_DATA as any}
      getBarColor={() => palette.blue.main}
      renderBarIndicators={({ dataKey, dataItem }) => {
        const indicator = INDICATORS[dataKey]
        const isEnterprise = dataItem?.value?.isEnterprise

        if (indicator && isEnterprise) {
          return (
            <BarChartIndicator
              label={indicator.label}
              color={indicator.color}
            />
          )
        }

        return <></>
      }}
    />
  </div>
)

export default Example
```

### Auto size

Bars try to fill all the space of the chart

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_6, palette } from '@toptal/picasso-utils'
import { BarChart } from '@toptal/picasso-charts'

const CHART_DATA = [
  {
    name: 'Apple',
    value: { 'engineers hired': 500 },
  },
  {
    name: 'Google',
    value: { 'engineers hired': 700 },
  },
  {
    name: 'Facebook',
    value: { 'engineers hired': 600 },
  },
  {
    name: 'Amazon',
    value: { 'engineers hired': 400 },
  },
  {
    name: 'Toptal',
    value: { 'engineers hired': 1000 },
  },
]

const Example = () => (
  <div style={{ width: 720 }}>
    <Container bottom={SPACING_6}>
      <BarChart
        data={CHART_DATA}
        getBarColor={() => palette.blue.main}
        width='100%'
        tooltip
        maxBarSize={80}
        autoSize
      />
    </Container>
    <Container>
      <BarChart
        height={300}
        data={CHART_DATA}
        layout='vertical'
        getBarColor={() => palette.blue.main}
        width='100%'
        tooltip
        showBarLabel={false}
        maxBarSize={40}
        autoSize
      />
    </Container>
  </div>
)

export default Example
```

### Vertical Bar

You can change the layout of the BarChart.

```tsx
import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  {
    name: 'Banana',
    value: { protein: 27, fat: 0.4 },
  },
  {
    name: 'Egg',
    value: { protein: 6, fat: 5 },
  },
  {
    name: 'Red meat',
    value: { protein: 19, fat: 23 },
  },
  {
    name: 'Peanut',
    value: { protein: 7.3, fat: 14 },
  },
]

const COLORS_MAPPING: Record<string, string> = {
  protein: palette.blue.main,
  carbs: palette.green.main,
  fat: palette.red.main,
}

const Example = () => (
  <div style={{ width: 820 }}>
    <BarChart
      data={CHART_DATA}
      layout='vertical'
      getBarColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      width='100%'
      tooltip
      showBarLabel={false}
    />
  </div>
)

export default Example
```

### Customized

You can customize chart's tooltip, height, width, fill and label colors.

```tsx
import React from 'react'
import { Paper, Container, Typography } from '@toptal/picasso'
import { SPACING_2, palette } from '@toptal/picasso-utils'
import { BarChart } from '@toptal/picasso-charts'

const CHART_DATA = [
  {
    name: 'Berlin',
    value: { infected: 4000, recovered: 2400 },
  },
  {
    name: 'Milan',
    value: { infected: 3000, recovered: 1398 },
  },
  {
    name: 'Moscow',
    value: { infected: 2000, recovered: 9800 },
  },
  {
    name: 'Los-Angeles',
    value: { infected: 2780, recovered: 3908 },
  },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length > 0) {
    const { infected, recovered } = payload[0].payload

    return (
      <Paper data-testid='tooltip'>
        <Container padded={SPACING_2}>
          <Typography size='medium' color='red'>
            Infected: {infected}
          </Typography>

          <Typography size='medium' color='green'>
            Recovered: {recovered}
          </Typography>
        </Container>
      </Paper>
    )
  }

  return null
}

const COLORS_MAPPING: Record<string, string> = {
  infected: palette.red.main,
  recovered: palette.green.main,
}

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      data={CHART_DATA}
      width='100%'
      height={300}
      getBarColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      getBarLabelColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      tooltip
      customTooltip={<CustomTooltip />}
    />
  </div>
)

export default Example
```

### Stacked

Bars can be stacked on top of each other by providing `stackedBars`

```tsx
import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  {
    name: 'Training',
    value: {
      'q1 budget': 2000,
      'q1 actual': 1600,
      'q2 budget': 1672,
      'q2 actual': 1200,
    },
  },
  {
    name: 'Events',
    value: {
      'q1 budget': 1752,
      'q1 actual': 1423,
      'q2 budget': 1856,
      'q2 actual': 1452,
    },
  },
]

const COLORS_MAPPING: Record<string, string> = {
  'q1 budget': palette.blue.main,
  'q1 actual': palette.grey.dark,
  'q2 budget': palette.blue.light,
  'q2 actual': palette.grey.light,
}

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      data={CHART_DATA}
      stackedBars={[
        ['q1 budget', 'q1 actual'],
        ['q2 budget', 'q2 actual'],
      ]}
      getBarColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      getBarLabelColor={() => palette.grey.dark}
      width='100%'
    />
  </div>
)

export default Example
```

### Stacked with bar chart indicators

Bars can have a customized indicator.

```tsx
import React from 'react'
import { BarChart, BarChartIndicator } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  {
    name: 'Google',
    value: {
      breakAmount: 2000,
      spendAmount: 1600,
    },
  },
  {
    name: 'Amazon',
    value: {
      breakAmount: 1752,
      spendAmount: 1423,
    },
  },
]

const INDICATORS: any = {
  Google: { color: palette.blue.light, label: 'E' },
  Amazon: { color: palette.purple.main, label: 'E' },
}

const COLORS_MAPPING: Record<string, string> = {
  breakAmount: palette.blue.main,
  spendAmount: palette.grey.dark,
}

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      width='100%'
      data={CHART_DATA as any}
      stackedBars={[['breakAmount', 'spendAmount']]}
      getBarColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      renderBarIndicators={({ dataKey, dataItem }) => {
        const indicator = INDICATORS[dataKey]
        const valueKey = dataItem?.tooltipPayload?.[0]?.dataKey

        if (indicator && valueKey === 'breakAmount') {
          return (
            <BarChartIndicator
              label={indicator.label}
              color={indicator.color}
            />
          )
        }

        return <></>
      }}
    />
  </div>
)

export default Example
```

### Hide bar label

You can hide label of each bar via `showBarLabel` prop being set to `false`.

```tsx
import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  {
    name: 'Banana',
    value: { protein: 27, carbs: 1.3, fat: 0.4 },
  },
  {
    name: 'Egg',
    value: { protein: 6, carbs: 0.6, fat: 5 },
  },
  {
    name: 'Red meat',
    value: { protein: 19, carbs: 0, fat: 23 },
  },
  {
    name: 'Peanut',
    value: { protein: 7.3, carbs: 4.6, fat: 14 },
  },
]

const COLORS_MAPPING: Record<string, string> = {
  protein: palette.blue.main,
  carbs: palette.green.main,
  fat: palette.red.main,
}

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      data={CHART_DATA}
      getBarColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      width='100%'
      tooltip
      showBarLabel={false}
    />
  </div>
)

export default Example
```

### Show every Nth tick on X or Y-axis (or hide axis labels completely)

You can show every Nth tick for X-axis or Y-axis. "0" hides all ticks, "1" shows all ticks (default behavior). The example below has "showEveryNthTickOnXAxis={3}" (every third tick is shown on X-axis) and "showEveryNthTickOnYAxis={0}" (no ticks are shown on Y-axis).

```tsx
import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  {
    name: 'Jan',
    value: { recovered: 2400 },
  },
  {
    name: 'Feb',
    value: { recovered: 1398 },
  },
  {
    name: 'Mar',
    value: { recovered: 9800 },
  },
  {
    name: 'Apr',
    value: { recovered: 3908 },
  },
  {
    name: 'May',
    value: { recovered: 3900 },
  },
  {
    name: 'Jun',
    value: { recovered: 4200 },
  },
  {
    name: 'Jul',
    value: { recovered: 4500 },
  },
]

const COLORS_MAPPING: Record<string, string> = {
  infected: palette.blue.main,
  recovered: palette.green.dark,
}

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      data={CHART_DATA}
      width='100%'
      height={300}
      getBarColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      getBarLabelColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      showEveryNthTickOnXAxis={3}
      showEveryNthTickOnYAxis={0}
    />
  </div>
)

export default Example
```

### Format the value axis

You can format the ticks on the value axis by providing the format function in the `valueAxisTickFormatter` property.

```tsx
import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  {
    name: 'Jan',
    value: { amount: 1000 },
  },
  {
    name: 'Feb',
    value: { amount: 2000 },
  },
  {
    name: 'Mar',
    value: { amount: 5000 },
  },
  {
    name: 'Apr',
    value: { amount: 10000 },
  },
  {
    name: 'May',
    value: { amount: 9000 },
  },
  {
    name: 'Jun',
    value: { amount: 3000 },
  },
  {
    name: 'Jul',
    value: { amount: 1000 },
  },
]

const COLORS_MAPPING: Record<string, string> = {
  amount: palette.green.dark,
}

const valueAxisFormatter = (value: number) => {
  return `$${value / 1000}k`
}

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      data={CHART_DATA}
      width='100%'
      height={300}
      getBarColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      getBarLabelColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      valueAxisTickFormatter={valueAxisFormatter}
    />
  </div>
)

export default Example
```
