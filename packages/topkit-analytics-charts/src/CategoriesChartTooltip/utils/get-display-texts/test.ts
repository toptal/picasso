import getDisplayTexts, { GetDisplayTextsParams } from './get-display-texts'

describe('getDisplayTexts', () => {
  it('returns correct data', () => {
    const INPUT: GetDisplayTextsParams = {
      currentData: {
        id: 'claimed',
        values: [
          {
            id: 'team',
            values: [
              { id: 'viable', value: 252 },
              { id: 'bad_leads', value: 0 },
              { id: 'rejected', value: 11 }
            ]
          },
          {
            id: 'user',
            values: [
              { id: 'viable', value: 595 },
              { id: 'bad_leads', value: 0 },
              { id: 'rejected', value: 24 }
            ]
          }
        ]
      },
      tooltips: {
        claimed: {
          team: {
            viable: 'Team Viable Average',
            bad_leads: 'Team Bad Leads (Unresponsive) Average',
            rejected: 'Team Removed Average'
          },
          user: {
            viable: 'Your Viable',
            bad_leads: 'Your Bad Leads (Unresponsive)',
            rejected: 'Your Removed'
          }
        }
      },
      currentPayload: {
        team: 263,
        user: 619,
        name: 'claimed'
      }
    }

    const OUTPUT = {
      teamTexts: [
        {
          key: 'team-viable',
          label: 'Team Viable Average',
          value: 252,
          color: '#204ecf'
        },
        {
          key: 'team-rejected',
          label: 'Team Removed Average',
          value: 11,
          color: '#204ecf'
        }
      ],
      userTexts: [
        {
          key: 'user-viable',
          label: 'Your Viable',
          value: 595,
          color: '#0f256e'
        },
        {
          key: 'user-rejected',
          label: 'Your Removed',
          value: 24,
          color: '#0f256e'
        }
      ]
    }

    expect(getDisplayTexts(INPUT)).toStrictEqual(OUTPUT)
  })
})
