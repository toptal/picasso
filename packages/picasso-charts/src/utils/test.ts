import { calcTopDomain, toChartFormat, toHighlightFormat } from './'

const RAW_CHART_DATA = {
  '2020-10-20': 1.7,
  '2020-10-21': 2,
  '2020-10-22': 1.7,
  '2020-10-23': 2,
  '2020-10-24': 1.5,
  '2020-10-25': 1.3,
  '2020-10-26': 1.6,
  '2020-10-27': 2.7,
  '2020-10-28': 3.7,
  '2020-10-29': 1.7,
  '2020-10-30': 1.5,
  '2020-10-31': 1.6,
  '2020-11-01': 2,
  '2020-11-02': 1.5,
  '2020-11-03': 1.3,
  '2020-11-04': 1.5,
  '2020-11-05': 1.5,
  '2020-11-06': 1.8,
  '2020-11-07': 1.6,
  '2020-11-08': 2,
  '2020-11-09': 2,
  '2020-11-10': 3.1,
  '2020-11-11': 1.9,
  '2020-11-12': 1.4,
  '2020-11-13': 1.6,
  '2020-11-14': 2,
  '2020-11-15': 1.7,
  '2020-11-16': 1.4,
  '2020-11-17': 1.5,
  '2020-11-18': 1.7,
  '2020-11-19': 1.3
}

const CONVERTED_CHART_DATA = [
  { x: '2020-10-20', test: 1.7 },
  { x: '2020-10-21', test: 2 },
  { x: '2020-10-22', test: 1.7 },
  { x: '2020-10-23', test: 2 },
  { x: '2020-10-24', test: 1.5 },
  { x: '2020-10-25', test: 1.3 },
  { x: '2020-10-26', test: 1.6 },
  { x: '2020-10-27', test: 2.7 },
  { x: '2020-10-28', test: 3.7 },
  { x: '2020-10-29', test: 1.7 },
  { x: '2020-10-30', test: 1.5 },
  { x: '2020-10-31', test: 1.6 },
  { x: '2020-11-01', test: 2 },
  { x: '2020-11-02', test: 1.5 },
  { x: '2020-11-03', test: 1.3 },
  { x: '2020-11-04', test: 1.5 },
  { x: '2020-11-05', test: 1.5 },
  { x: '2020-11-06', test: 1.8 },
  { x: '2020-11-07', test: 1.6 },
  { x: '2020-11-08', test: 2 },
  { x: '2020-11-09', test: 2 },
  { x: '2020-11-10', test: 3.1 },
  { x: '2020-11-11', test: 1.9 },
  { x: '2020-11-12', test: 1.4 },
  { x: '2020-11-13', test: 1.6 },
  { x: '2020-11-14', test: 2 },
  { x: '2020-11-15', test: 1.7 },
  { x: '2020-11-16', test: 1.4 },
  { x: '2020-11-17', test: 1.5 },
  { x: '2020-11-18', test: 1.7 },
  { x: '2020-11-19', test: 1.3 }
]

describe('chart utils', () => {
  test('calc top domain', () => {
    const topDomain = calcTopDomain(CONVERTED_CHART_DATA, 'x')
    expect(topDomain).toEqual(5)
  })

  test('convert chart data', () => {
    const convertedChartData = toChartFormat(RAW_CHART_DATA, 'x', 'test')
    expect(convertedChartData).toEqual(CONVERTED_CHART_DATA)
  })

  test('convert highlight data', () => {
    const convertedHighlightsData = toHighlightFormat(
      ['2020-10-21', '2020-11-02'],
      CONVERTED_CHART_DATA,
      'red'
    )
    expect(convertedHighlightsData).toEqual([
      { color: 'red', from: 1, to: 2 },
      { color: 'red', from: 13, to: 14 }
    ])
  })
})
