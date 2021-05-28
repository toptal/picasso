import formatData from './format-data'
import { Bar } from '../../types'

describe('formatData', () => {
  it('formats categories chart data', () => {
    const ORIGINAL_DATA: Bar[] = [
      {
        id: 'claimed',
        values: [
          {
            id: 'team',
            values: [
              {
                id: 'viable',
                value: 252
              },
              {
                id: 'bad_leads',
                value: 0
              },
              {
                id: 'rejected',
                value: 11
              }
            ]
          },
          {
            id: 'user',
            values: [
              {
                id: 'viable',
                value: 595
              },
              {
                id: 'bad_leads',
                value: 0
              },
              {
                id: 'rejected',
                value: 24
              }
            ]
          }
        ]
      },
      {
        id: 'contacted',
        values: [
          {
            id: 'team',
            values: [
              {
                id: 'contacted',
                value: 189
              }
            ]
          },
          {
            id: 'user',
            values: [
              {
                id: 'contacted',
                value: 421
              }
            ]
          }
        ]
      }
    ]

    const CHART_LABELS = {
      claimed: 'Claimed',
      contacted: 'Contacted'
    }

    const EXPECTED_RESULT = [
      {
        name: 'claimed',
        label: 'Claimed',
        value: {
          team: 263,
          user: 619
        }
      },
      {
        name: 'contacted',
        label: 'Contacted',
        value: {
          team: 189,
          user: 421
        }
      }
    ]

    expect(formatData(ORIGINAL_DATA, CHART_LABELS)).toStrictEqual(
      EXPECTED_RESULT
    )
  })
})
