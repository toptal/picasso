import React from 'react'
import { palette } from '@toptal/picasso/utils'
import { LineChart } from '@toptal/picasso-charts'
import { toChartFormat, toHighlightFormat } from '@toptal/picasso-charts/utils'

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
  '2020-11-10': 3.1
}

const REFERENCE_LINE_DATA = [
  {
    y: 1,
    color: palette.green.main
  },
  {
    y: 1.5,
    color: palette.yellow.main
  },
  {
    y: 2,
    color: palette.red.main
  }
]

const PREDEFINED_HIGHLIGHT = {
  from: 6,
  to: 8,
  color: palette.yellow.main
}
const HIGHLIGHTS_DATA = ['2020-10-21', '2020-11-02']

const convertedData = toChartFormat(RAW_CHART_DATA, 'date', 'projects')

const convertedHighlightsData = toHighlightFormat(
  HIGHLIGHTS_DATA,
  convertedData,
  palette.green.main,
  'date'
)

const highlightsData = [PREDEFINED_HIGHLIGHT, ...convertedHighlightsData]

const Example = () => (
  <LineChart
    xAxisKey='date'
    data={convertedData}
    lines={{
      projects: palette.blue.main
    }}
    highlightsData={highlightsData}
    referenceLineData={REFERENCE_LINE_DATA}
  />
)

export default Example
