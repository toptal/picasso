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

const CustomLabel = ({ value, viewBox }: any) => {
  const width = viewBox.width
  const xPosition = viewBox.x
  const yPosition = viewBox.y

  return (
    <text
      x={xPosition + width / 2}
      y={yPosition}
      fill={palette.red.main}
      style={{ fontSize: 14 }}
      textAnchor='middle'
      dy={-2}
    >
      {value}
    </text>
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active) {
    const { infected, recovered } = payload[0].payload

    return (
      <Paper>
        <Container padded='xsmall'>
          <Typography size='medium' color='blue'>
            Infected: {infected}
          </Typography>

          <Typography size='medium' color='dark-grey'>
            Recovered: {recovered}
          </Typography>
        </Container>
      </Paper>
    )
  }

  return null
}

const Example = () => (
  <BarChart
    data={CHART_DATA}
    fill={{ infected: palette.blue.main, recovered: palette.grey.dark }}
    label
    customLabel={<CustomLabel />}
    tooltip
    customTooltip={<CustomTooltip />}
  />
)

export default Example
