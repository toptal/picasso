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
    tooltip
    customTooltip={<CustomTooltip />}
    label
  />
)

export default Example
