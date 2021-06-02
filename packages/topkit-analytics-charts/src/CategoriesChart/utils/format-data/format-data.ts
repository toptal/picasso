import { sum } from '@toptal/picasso/utils'

import { DataItem, LabelMap } from '../../types'

const formatData = (data: DataItem[], labels: LabelMap) => {
  return data.map(({ id, values }) => {
    const [team, user] = values

    const sumTeam = sum(team.values.map(({ value }) => value))
    const sumUser = sum(user.values.map(({ value }) => value))

    return {
      name: id,
      label: labels[id],
      value: {
        team: sumTeam,
        user: sumUser
      }
    }
  })
}

export default formatData
