import { format, parseISO } from 'date-fns'

import toChartFormat from './'
import generateReferenceKey from './../generate-reference-key'

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
const X_AXIS_KEY = 'x'

describe('toChartFormat', () => {
  it('converts chart data', () => {
    const EXPECTED_CHART_DATA = [
      { x: '2020-10-20', projects: 1.7, team: 1.7 },
      { x: '2020-10-21', projects: 2, team: 2 },
      { x: '2020-10-22', projects: 1.7, team: 1.7 },
      { x: '2020-10-23', projects: 2, team: 2 },
      { x: '2020-10-24', projects: 1.5, team: 1.5 },
      { x: '2020-10-25', projects: 1.3, team: 1.3 }
    ]
    const convertedChartData = toChartFormat(
      RAW_CHART_DATA,
      undefined,
      X_AXIS_KEY,
      label => label
    )

    expect(convertedChartData).toEqual(EXPECTED_CHART_DATA)
  })

  it('converts chart data with custom label format', () => {
    const EXPECTED_CHART_DATA = [
      { x: 'Oct 20', projects: 1.7, team: 1.7 },
      { x: 'Oct 21', projects: 2, team: 2 },
      { x: 'Oct 22', projects: 1.7, team: 1.7 },
      { x: 'Oct 23', projects: 2, team: 2 },
      { x: 'Oct 24', projects: 1.5, team: 1.5 },
      { x: 'Oct 25', projects: 1.3, team: 1.3 }
    ]
    const convertedChartData = toChartFormat(
      RAW_CHART_DATA,
      undefined,
      X_AXIS_KEY,
      label => format(parseISO(label), 'MMM dd')
    )

    expect(convertedChartData).toEqual(EXPECTED_CHART_DATA)
  })

  it('converts chart data with null values', () => {
    const CHART_DATA_WITH_NULLS = [
      {
        id: 'projects',
        values: {
          '2020-10-20': 1.7,
          '2020-10-21': null,
          '2020-10-22': null,
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
          '2020-10-22': null,
          '2020-10-23': 2,
          '2020-10-24': null,
          '2020-10-25': 1.3
        }
      }
    ]

    const EXPECTED_CHART_DATA = [
      { x: '2020-10-20', projects: 1.7, team: 1.7 },
      { x: '2020-10-21', projects: 0, team: 2, projectsIsEmpty: true },
      {
        x: '2020-10-22',
        projects: 0,
        team: 0,
        projectsIsEmpty: true,
        teamIsEmpty: true
      },
      { x: '2020-10-23', projects: 2, team: 2 },
      { x: '2020-10-24', projects: 1.5, team: 0, teamIsEmpty: true },
      { x: '2020-10-25', projects: 1.3, team: 1.3 }
    ]

    const convertedChartData = toChartFormat(
      CHART_DATA_WITH_NULLS,
      undefined,
      X_AXIS_KEY,
      label => label
    )

    expect(convertedChartData).toEqual(EXPECTED_CHART_DATA)
  })

  it('convertschart data with ref data', () => {
    const REF_DATA = [
      {
        data: {
          '2020-10-20': 1.7,
          '2020-10-21': 2,
          '2020-10-22': 1.7,
          '2020-10-23': 2,
          '2020-10-24': 1.5,
          '2020-10-25': 1.3
        },
        color: 'red'
      },
      {
        data: {
          '2020-10-20': 1.7,
          '2020-10-21': 2,
          '2020-10-22': 1.7,
          '2020-10-23': 2,
          '2020-10-24': 1.5,
          '2020-10-25': 1.3
        },
        color: 'blue'
      }
    ]
    const EXPECTED_CHART_DATA = [
      {
        x: '2020-10-20',
        [generateReferenceKey(0)]: 1.7,
        [generateReferenceKey(1)]: 1.7,
        projects: 1.7,
        team: 1.7
      },
      {
        x: '2020-10-21',
        [generateReferenceKey(0)]: 2,
        [generateReferenceKey(1)]: 2,
        projects: 2,
        team: 2
      },
      {
        x: '2020-10-22',
        [generateReferenceKey(0)]: 1.7,
        [generateReferenceKey(1)]: 1.7,
        projects: 1.7,
        team: 1.7
      },
      {
        x: '2020-10-23',
        [generateReferenceKey(0)]: 2,
        [generateReferenceKey(1)]: 2,
        projects: 2,
        team: 2
      },
      {
        x: '2020-10-24',
        [generateReferenceKey(0)]: 1.5,
        [generateReferenceKey(1)]: 1.5,
        projects: 1.5,
        team: 1.5
      },
      {
        x: '2020-10-25',
        [generateReferenceKey(0)]: 1.3,
        [generateReferenceKey(1)]: 1.3,
        projects: 1.3,
        team: 1.3
      }
    ]
    const convertedChartData = toChartFormat(
      RAW_CHART_DATA,
      REF_DATA,
      X_AXIS_KEY,
      label => label
    )

    expect(convertedChartData).toEqual(EXPECTED_CHART_DATA)
  })
})
