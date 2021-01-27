import React from 'react'
import { Paper, Container, Typography } from '@toptal/picasso'
import { BarChart } from '@toptal/picasso-charts'

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
    width={720}
    height={300}
    fillSchema={{ infected: 'dark-grey', recovered: 'blue' }}
    labelColorSchema={{ infected: 'red', recovered: 'dark-grey' }}
    tooltip
    customTooltip={<CustomTooltip />}
  />
)

export default Example
