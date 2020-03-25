import React from 'react'
import { palette } from '@toptal/picasso/utils'
import { LineChart } from '@toptal/picasso-charts'
import { Paper, Container, Typography, Indicator } from '@toptal/picasso'

const DATE_LIST = [
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10'
]

const randomNumberBetweenInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const generateRandomChartData = () =>
  // eslint-disable-next-line id-length
  DATE_LIST.map(date => {
    const infected = randomNumberBetweenInterval(7, 12)
    const recovered = randomNumberBetweenInterval(3, 7)
    const died = infected - recovered
    return {
      date,
      infected,
      recovered,
      died
    }
  })

const CustomTooltip = ({ active, payload }: any) => {
  if (active) {
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
    data={generateRandomChartData()}
    lines={{
      infected: palette.yellow.main,
      recovered: palette.blue.main,
      died: palette.red.main
    }}
  />
)

export default Example
