import { format, parseISO } from 'date-fns'

import toChartFormat from './'

const RAW_CHART_DATA = [
  {
    id: 'projects',
    values: {
      '2020-10-20': 1.7,
      '2020-10-21': 2,
      '2020-10-22': 1.7,
      '2020-10-23': 2,
      '2020-10-24': 1.5,
      '2020-10-25': 1.3
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
      '2020-10-25': 1.3
    }
  }
]

test('convert chart data', () => {
  const EXPECTED_CHART_DATA = [
    { x: '2020-10-20', projects: 1.7, team: 1.7 },
    { x: '2020-10-21', projects: 2, team: 2 },
    { x: '2020-10-22', projects: 1.7, team: 1.7 },
    { x: '2020-10-23', projects: 2, team: 2 },
    { x: '2020-10-24', projects: 1.5, team: 1.5 },
    { x: '2020-10-25', projects: 1.3, team: 1.3 }
  ]
  const convertedChartData = toChartFormat(RAW_CHART_DATA, 'x', label => label)
  expect(convertedChartData).toEqual(EXPECTED_CHART_DATA)
})

test('convert chart data with custom label format', () => {
  const EXPECTED_CHART_DATA = [
    { x: 'Oct 20', projects: 1.7, team: 1.7 },
    { x: 'Oct 21', projects: 2, team: 2 },
    { x: 'Oct 22', projects: 1.7, team: 1.7 },
    { x: 'Oct 23', projects: 2, team: 2 },
    { x: 'Oct 24', projects: 1.5, team: 1.5 },
    { x: 'Oct 25', projects: 1.3, team: 1.3 }
  ]
  const convertedChartData = toChartFormat(RAW_CHART_DATA, 'x', label =>
    format(parseISO(label), 'MMM dd')
  )
  expect(convertedChartData).toEqual(EXPECTED_CHART_DATA)
})
