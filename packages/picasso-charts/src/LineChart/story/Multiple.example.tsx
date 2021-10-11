import React from 'react'
import { palette } from '@toptal/picasso/utils'
import { LineChart } from '@toptal/picasso-charts'
import { Paper, Container, Typography, Indicator } from '@toptal/picasso'

const CHART_DATA = [
  {
    date: '20',
    infected: 10,
    recovered: 5,
    died: 5
  },
  {
    date: '21',
    infected: 9,
    recovered: 6,
    died: 3
  },
  {
    date: '22',
    infected: 9,
    recovered: 6,
    died: 3
  },
  {
    date: '23',
    infected: 8,
    recovered: 4,
    died: 4
  },
  {
    date: '24',
    infected: 11,
    recovered: 6,
    died: 5
  },
  {
    date: '25',
    infected: 7,
    recovered: 7,
    died: 0
  },
  {
    date: '26',
    infected: 11,
    recovered: 7,
    died: 4
  },
  {
    date: '27',
    infected: 7,
    recovered: 4,
    died: 3
  },
  {
    date: '28',
    infected: 12,
    recovered: 3,
    died: 9
  },
  {
    date: '29',
    infected: 8,
    recovered: 6,
    died: 2
  },
  {
    date: '30',
    infected: 8,
    recovered: 3,
    died: 5
  },
  {
    date: '31',
    infected: 12,
    recovered: 4,
    died: 8
  },
  {
    date: '01',
    infected: 7,
    recovered: 4,
    died: 3
  },
  {
    date: '02',
    infected: 10,
    recovered: 4,
    died: 6
  },
  {
    date: '03',
    infected: 7,
    recovered: 7,
    died: 0
  },
  {
    date: '04',
    infected: 8,
    recovered: 5,
    died: 3
  },
  {
    date: '05',
    infected: 11,
    recovered: 7,
    died: 4
  },
  {
    date: '06',
    infected: 8,
    recovered: 3,
    died: 5
  },
  {
    date: '07',
    infected: 11,
    recovered: 3,
    died: 8
  },
  {
    date: '08',
    infected: 7,
    recovered: 6,
    died: 1
  },
  {
    date: '09',
    infected: 12,
    recovered: 4,
    died: 8
  },
  {
    date: '10',
    infected: 11,
    recovered: 6,
    died: 5
  }
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length > 0) {
    // eslint-disable-next-line id-length
    const { x, infected, recovered, died } = payload[0].payload

    return (
      <Paper>
        <Container padded='xsmall'>
          <Typography size='medium'>Date: {x}</Typography>
          <Container>
            <Container inline right='small'>
              <Indicator color='yellow' />
            </Container>
            <Typography inline size='medium'>
              Infected: {infected}
            </Typography>
          </Container>

          <Container>
            <Container inline right='small'>
              <Indicator color='red' />
            </Container>
            <Typography inline size='medium'>
              Died: {died}
            </Typography>
          </Container>

          <Container>
            <Container inline right='small'>
              <Indicator color='blue' />
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
      died: { color: palette.red.main }
    }}
  />
)

export default Example
