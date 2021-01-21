import React from 'react'
import { Paper, Container, Typography } from '@toptal/picasso'
import { BarChart, BarChartLabelProps } from '@toptal/picasso-charts'
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

const CustomLabel = ({ value, viewBox }: BarChartLabelProps) => {
  const width = viewBox?.width ?? 0
  const xPosition = viewBox?.x ?? 0
  const yPosition = viewBox?.y ?? 0

  return (
    <text
      x={xPosition + width / 2}
      y={yPosition}
      fill={palette.blue.main}
      style={{ fontSize: 14 }}
      textAnchor='middle'
      dy={-6}
    >
      {value}
    </text>
  )
}

const CustomTooltip = ({
  active,
  payload
}: {
  active?: boolean
  payload?: { payload: { infected: boolean; recovered: boolean } }[]
}) => {
  if (active) {
    const { infected, recovered } = payload
      ? payload[0].payload
      : {
          infected: 0,
          recovered: 0
        }

    return (
      <Paper>
        <Container padded='xsmall'>
          <Container>
            <Typography inline size='medium' color='blue'>
              Infected: {infected}
            </Typography>
          </Container>

          <Container>
            <Typography inline size='medium' color='dark-grey'>
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
  <BarChart
    data={CHART_DATA}
    fill={{ infected: palette.blue.main, recovered: palette.grey.dark }}
    customTooltip={<CustomTooltip />}
    customLabel={<CustomLabel />}
  />
)

export default Example
