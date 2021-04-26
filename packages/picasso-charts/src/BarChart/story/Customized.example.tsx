import React from 'react'
import { Paper, Container, Typography } from '@toptal/picasso'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso/utils'

const CHART_DATA = [
  {
    name: 'Berlin',
    value: { infected: 4000, recovered: 2400 }
  },
  {
    name: 'Milan',
    value: { infected: 3000, recovered: 1398 }
  },
  {
    name: 'Moscow',
    value: { infected: 2000, recovered: 9800 }
  },
  {
    name: 'Los-Angeles',
    value: { infected: 2780, recovered: 3908 }
  }
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length > 0) {
    const { infected, recovered } = payload[0].payload

    return (
      <Paper data-testid='tooltip'>
        <Container padded='xsmall'>
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
  recovered: palette.green.main
}

const Example = () => (
  <BarChart
    dataKeys={['infected', 'recovered']}
    data={CHART_DATA}
    width={720}
    height={300}
    getBarColor={dataKey => COLORS_MAPPING[dataKey]}
    getBarLabelColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
    tooltip
    customTooltip={<CustomTooltip />}
  />
)

export default Example
