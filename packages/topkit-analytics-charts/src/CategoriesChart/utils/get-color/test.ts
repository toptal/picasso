import { palette } from '@toptal/picasso/utils'

import getColor from './get-color'

describe('getColor', () => {
  const TEAM_COLOR_CHECK_LIST = [
    ['claimed', palette.blue.main],
    ['bad_leads', palette.red.main],
    ['paused', palette.yellow.main],
    ['removed', palette.green.main],
    ['collections', palette.red.main],
    ['pending', palette.yellow.main]
  ]

  it.each(TEAM_COLOR_CHECK_LIST)(
    'returns correct color for team under status of %s',
    (status, color) => {
      expect(
        getColor({
          dataKey: 'team',
          entry: { name: status, value: { team: 5, user: 6 } }
        })
      ).toBe(color)
    }
  )

  const USER_COLOR_CHECK_LIST = [
    ['claimed', palette.blue.darker],
    ['bad_leads', palette.red.main],
    ['paused', palette.yellow.main],
    ['removed', palette.green.main],
    ['collections', palette.red.main],
    ['pending', palette.yellow.main]
  ]

  it.each(USER_COLOR_CHECK_LIST)(
    'returns correct color for user under status of %s',
    (status, color) => {
      expect(
        getColor({
          dataKey: 'user',
          entry: { name: status, value: { team: 5, user: 6 } }
        })
      ).toBe(color)
    }
  )

  it('renders bad result color when user value is lower than team value', () => {
    expect(
      getColor({
        dataKey: 'user',
        entry: { name: 'some status', value: { team: 5, user: 4 } }
      })
    ).toBe(palette.red.main)
  })

  it('renders normal color when user value is lower than team value and status is claimed', () => {
    expect(
      getColor({
        dataKey: 'user',
        entry: { name: 'claimed', value: { team: 5, user: 4 } }
      })
    ).toBe(palette.blue.darker)
  })
})
