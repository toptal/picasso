import React from 'react'
import { render, waitFor } from '@toptal/picasso/test-utils'
import { palette } from '@toptal/picasso/utils'

import BarChart, { formatData, extractValues } from './BarChart'

const TEST_DATA = [
  { name: 'Moscow', value: { infected: 1, recovered: 2 } },
  { name: 'Berlin', value: { infected: 2, recovered: 5 } },
  { name: 'London', value: { infected: 7, recovered: 118 } },
]

const renderBarChart = (showBarLabel?: boolean) => {
  return render(
    <div style={{ width: 720 }}>
      <BarChart
        data={TEST_DATA}
        getBarColor={() => palette.blue.main}
        getBarLabelColor={() => palette.grey.dark}
        width={'100%'}
        showBarLabel={showBarLabel}
      />
    </div>
  )
}

describe('BarChart', () => {
  it('formats data correctly', () => {
    const expectedData = [
      {
        name: 'Moscow',
        infected: 1,
        recovered: 2,
        value: { infected: 1, recovered: 2 },
      },
      {
        name: 'Berlin',
        infected: 2,
        recovered: 5,
        value: { infected: 2, recovered: 5 },
      },
      {
        name: 'London',
        infected: 7,
        recovered: 118,
        value: { infected: 7, recovered: 118 },
      },
    ]

    expect(formatData<'infected' | 'recovered'>(TEST_DATA)).toEqual(
      expectedData
    )
  })

  it('extracts values correctly', () => {
    const expectedData = [
      { infected: 1, recovered: 2 },
      { infected: 2, recovered: 5 },
      { infected: 7, recovered: 118 },
    ]

    expect(extractValues<'infected' | 'recovered'>(TEST_DATA)).toEqual(
      expectedData
    )
  })

  it('shows label of each bar with `showBarLabel` prop being set to `true` by default', () => {
    const { queryByText } = renderBarChart()

    waitFor(() => expect(queryByText('118')).toBeInTheDocument())
  })

  it('hides label of each bar via passed `showBarLabel` prop being set to `false', () => {
    const { queryByText } = renderBarChart(false)

    waitFor(() => expect(queryByText('118')).not.toBeInTheDocument())
  })
})
