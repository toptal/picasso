import getChartTicks from './'

const CHART_DATA = [
  { order: 0, x: '2020-10-20', test: 1.7 },
  { order: 1, x: '2020-10-21', test: 2 },
  { order: 2, x: '2020-10-22', test: 1.7 },
  { order: 3, x: '2020-10-23', test: 2 }
]

describe('getChartTicks', () => {
  it('get chart ticks', () => {
    const chartTicks = getChartTicks(CHART_DATA)

    expect(chartTicks).toEqual([0, 1, 2, 3])
  })
})
