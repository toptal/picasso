import { format, parseISO } from 'date-fns'

import toHighlightFormat from './'

const HIGHLIGHTS = [
  {
    data: ['2020-11-01', '2020-11-04'],
    color: 'red'
  }
]

const X_AXIS_KEY = 'x'

test('convert highlight data', () => {
  const CHART_DATA = [
    { x: '2020-11-01', test: 2 },
    { x: '2020-11-02', test: 1.5 },
    { x: '2020-11-03', test: 1.3 },
    { x: '2020-11-04', test: 1.5 },
    { x: '2020-11-05', test: 1.5 }
  ]
  const convertedHighlightsData = toHighlightFormat(
    CHART_DATA,
    HIGHLIGHTS,
    X_AXIS_KEY,
    label => label
  )

  expect(convertedHighlightsData).toEqual([
    { color: 'red', from: 0, to: 1 },
    { color: 'red', from: 3, to: 4 }
  ])
})

test('convert highlight data with label format', () => {
  const CHART_DATA = [
    { x: 'Nov 01', test: 2 },
    { x: 'Nov 02', test: 1.5 },
    { x: 'Nov 03', test: 1.3 },
    { x: 'Nov 04', test: 1.5 },
    { x: 'Nov 05', test: 1.5 }
  ]
  const convertedHighlightsData = toHighlightFormat(
    CHART_DATA,
    HIGHLIGHTS,
    X_AXIS_KEY,
    (label: string) => format(parseISO(label), 'MMM dd')
  )

  expect(convertedHighlightsData).toEqual([
    { color: 'red', from: 0, to: 1 },
    { color: 'red', from: 3, to: 4 }
  ])
})
