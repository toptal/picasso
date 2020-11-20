import React from 'react'
import { Container } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'
import { AnalyticsChart } from '@topkit/analytics-charts'

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
      '2020-11-10': 0.0
    }
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
      '2020-11-10': 3.1
    }
  }
]

type Payload = {
  name: string
  value: number
  payload: Record<string, number | boolean>
}

const CustomTooltip = ({
  active,
  payload
}: {
  active?: boolean
  payload?: Payload[]
}) => {
  if (!active) return null

  return (
    <Container style={{ background: '#fff' }}>
      {payload!.map(({ name, value, payload }) => (
        <Container key={name}>
          <b>{name}</b>:{' '}
          {payload[`${name}IsEmpty`] ? 'No data provided.' : value}
        </Container>
      ))}
    </Container>
  )
}

const Example = () => (
  <AnalyticsChart
    tooltip
    customTooltip={<CustomTooltip />}
    data={CHART_DATA}
    lineConfig={{
      role: { color: palette.yellow.main },
      team: { color: palette.blue.main }
    }}
    granularity='day'
  />
)

export default Example
